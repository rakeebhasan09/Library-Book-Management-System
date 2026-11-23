import app from "./app";
import config from "./config";
import { pool } from "./config/db";
import { initDatabase } from "./config/initDB";

const startServer = async () => {
    try {
        const time = await pool.query("SELECT NOW()");
        console.log(`Database connected succeffuly on: ${time.rows[0].now}`);
        initDatabase();
        app.listen(config.port, () => {
            console.log(
                `Library Book Management System Server Is Running On Port: ${config.port}`,
            );
        });
    } catch (error) {
        console.error("", error);
    }
};

startServer();
