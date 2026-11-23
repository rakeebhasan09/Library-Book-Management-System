import dotenv from "dotenv";
import path from "node:path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

const config = {
    port: process.env.PORT,
    nodeEnv: process.env.NODE_ENV,
    connection_strin: process.env.DATABASE_URL,
    jwt_secret: process.env.JWT_SECRET,
};

export default config;
