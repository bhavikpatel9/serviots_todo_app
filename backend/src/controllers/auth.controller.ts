import { Request, Response } from "express";
import AuthRepository from "../repositories/auth.repository";
import { generalResponse } from "../utils";

export default class AuthController {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    public register = async (req: Request, res: Response) => {
        try {
            const { name, email, password } = req.body;
            const result = await this.authRepository.register({ name, email, password });
            return generalResponse(201, true, result, "User registered successfully", res);
        } catch (error: any) {
            console.error("Error registering user:", error);
            return generalResponse(
                error.statusCode || 500,
                false,
                null,
                error.message || "Internal server error",
                res
            );
        }
    }

    public login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const result = await this.authRepository.login({ email, password });
            return generalResponse(200, true, result, "User logged in successfully", res);
        } catch (error: any) {
            console.error("Error logging in user:", error);
            return generalResponse(
                error.statusCode || 500,
                false,
                null,
                error.message || "Internal server error",
                res
            );
        }
    }
}