import { Router } from "express";
import TaskController from "../controllers/task.controller";
import { jwtAuthCheck } from "../middlewares/jwtAuth.middleware";
import { joiValidationMiddleware } from "../middlewares/joiValidation.middleware";
import { createTaskValidationSchema, deleteTaskValidationSchema, updateTaskValidationSchema } from "../validationSchemas/task.validationSchema";

class TaskRoutes {
    public router: Router;
    private readonly basePath: string = '/tasks';
    private readonly controller: TaskController;

    constructor() {
        this.router = Router();
        this.controller = new TaskController();
        this.registerRoutes();
    }

    public registerRoutes() {
        this.router.post(`${this.basePath}`, jwtAuthCheck, joiValidationMiddleware(createTaskValidationSchema), this.controller.createTask);
        this.router.get(`${this.basePath}`, jwtAuthCheck, this.controller.getAllTasks);
        this.router.put(`${this.basePath}/:id`, jwtAuthCheck, joiValidationMiddleware(updateTaskValidationSchema), this.controller.updateTask);
        this.router.delete(`${this.basePath}/:id`, jwtAuthCheck, this.controller.deleteTask);

    }
}

export default TaskRoutes;
