import bcrypt from "bcryptjs";

const hashPassword = (plainPassword: string) => {
    return bcrypt.hash(plainPassword, 10);
};

const compareHash = (plainPassword: string, hashPassword: string) => {
    return bcrypt.compare(plainPassword, hashPassword);
};

export const passwordHelpers = { hashPassword, compareHash };
