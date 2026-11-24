import express from "express";
import cors from "cors";
import authRouter from "./auth/auth.routes";
const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Library Book Management System Server",
    });
});

app.use("/api/v1/auth", authRouter);

export default app;
