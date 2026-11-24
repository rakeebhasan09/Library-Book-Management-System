import { RequestHandler } from "express";
import { authService } from "./auth.service";

const register: RequestHandler = async (req, res, next) => {
    try {
        const result = await authService.insertUserIntoDB(req.body);

        delete result.rows[0].password;

        res.status(201).json({
            success: true,
            message: "User Registerd Successfully!!",
            data: result.rows[0],
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error,
        });
    }
};

export const authController = { register };
