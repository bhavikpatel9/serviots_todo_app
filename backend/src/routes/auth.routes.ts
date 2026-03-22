import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { joiValidationMiddleware } from "../middlewares/joiValidation.middleware";
import { loginValidationSchema, registerValidationSchema } from "../validationSchemas/auth.validationSchema";

class AuthRoutes {
    public router: Router;
    private readonly basePath: string = '/auth';
    private readonly controller: AuthController;

    constructor() {
        this.router = Router();
        this.controller = new AuthController();
        this.registerRoutes();
    }

    public registerRoutes() {
        this.router.post(`${this.basePath}/register`, joiValidationMiddleware(registerValidationSchema), this.controller.register);
        this.router.post(`${this.basePath}/login`, joiValidationMiddleware(loginValidationSchema), this.controller.login);
    }
}

export default AuthRoutes;
