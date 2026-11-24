import { pool } from "../config/db";
import { passwordHelpers } from "../utils/paswordHelpers";
import { tokenHelpers } from "../utils/tokenHelpers";
import { IAuth } from "./auth.interface";

// Create New User
const insertUserIntoDB = async (payload: IAuth) => {
    const { name, email, password, role } = payload;
    // Check User If Exists
    const user = await pool.query(
        `
        SELECT * FROM users WHERE email = $1
        `,
        [email],
    );

    if (user.rowCount !== 0) {
        throw new Error("User Already Exists. Try To Login.");
    }

    const hashedPassword = await passwordHelpers.hashPassword(password);

    const result = pool.query(
        `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, email, hashedPassword, role],
    );

    return result;
};

// Login User
const loginUser = async (email: string, password: string) => {
    const user = await pool.query(
        `
        SELECT * FROM users WHERE email = $1
        `,
        [email],
    );

    if (user.rowCount === 0) {
        throw new Error("User Not Found. Please Register First.");
    }

    const machedPassword = await passwordHelpers.compareHash(
        password,
        user.rows[0].password,
    );

    if (!machedPassword) {
        throw new Error("Invalid User Credentials!!");
    }

    const jwtPayload = {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role,
    };

    const accessToken = tokenHelpers.generateToken(jwtPayload);

    return { accessToken, user };
};

export const authService = { insertUserIntoDB, loginUser };
