import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const generateToken = (payload: JwtPayload) => {
    return jwt.sign(payload, config.jwt_secret as string, { expiresIn: "1d" });
};

export const tokenHelpers = { generateToken };
