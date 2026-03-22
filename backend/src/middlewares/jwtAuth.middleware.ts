import { NextFunction, Request, Response } from "express";
import { generalResponse, verifyToken } from "../utils";
import { User } from "../models/User.model";

export const jwtAuthCheck = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return generalResponse(401, false, null, "Authorization token missing", res);
        }
        const decodedToken = verifyToken(token);
        const user = await User.findById(decodedToken.id);
        if(!user) {
            return generalResponse(401, false, null, "Invalid token", res);
        }
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Error verifying token:", error);
        return generalResponse(401, false, null, "Invalid or expired token", res);
    }
}