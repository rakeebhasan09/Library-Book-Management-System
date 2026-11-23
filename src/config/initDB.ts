import { pool } from "./db";

const createTableQuery = `
CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
email VARCHAR(150) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL,
role VARCHAR(100) CHECK (role IN ('admin', 'member')) DEFAULT 'member'
)
`;

export const initDatabase = async () => {
    await pool.query(createTableQuery);
    console.log("Users Table Created in the database.");
};
