import { pool } from "../config/db";
import { passwordHelpers } from "../utils/paswordHelpers";
import { IAuth } from "./auth.interface";

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

export const authService = { insertUserIntoDB };
