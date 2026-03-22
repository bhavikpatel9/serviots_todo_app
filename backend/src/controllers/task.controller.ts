import { Request, Response } from "express";
import TaskRepository from "../repositories/task.repository";
import { generalResponse, isValidObjectId, ITokenPayload } from "../utils";

export default class TaskController {
    private taskRepository: TaskRepository;

    constructor() {
        this.taskRepository = new TaskRepository();
    }

    public createTask = async (req: Request, res: Response) => {
        try {
            const { id: userId } = req.user as ITokenPayload;
            const { title, description } = req.body;
            const result = await this.taskRepository.createTask({ userId, title, description });
            return generalResponse(201, true, result, "Task created successfully", res);
        } catch (error: any) {
            console.error("Error creating task:", error);
            return generalResponse(
                error.statusCode || 500,
                false,
                null,
                error.message || "Internal server error",
                res
            );
        }
    }

    public getAllTasks = async (req: Request, res: Response) => {
        try {
            const { id: userId } = req.user as ITokenPayload;
            const result = await this.taskRepository.getAllTasks(userId);
            return generalResponse(200, true, result, "Tasks fetched successfully", res);
        } catch (error: any) {
            console.error("Error fetching tasks:", error);
            return generalResponse(
                error.statusCode || 500,
                false,
                null,
                error.message || "Internal server error",
                res
            );
        }
    }

    public updateTask = async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id as string;
            if (!isValidObjectId(taskId)) {
                return generalResponse(400, false, null, "Invalid task ID", res);
            }
            const { id: userId } = req.user as ITokenPayload;
            const { title, description, status } = req.body;
            const result = await this.taskRepository.updateTask(taskId, userId, { title, description, status });
            return generalResponse(200, true, result, "Task updated successfully", res);
        } catch (error: any) {
            console.error("Error updating task:", error);
            return generalResponse(
                error.statusCode || 500,
                false,
                null,
                error.message || "Internal server error",
                res
            );
        }
    }

    public deleteTask = async (req: Request, res: Response) => {
        try {
            const taskId = req.params.id as string;
            if (!isValidObjectId(taskId)) {
                return generalResponse(400, false, null, "Invalid task ID", res);
            }
            const { id: userId } = req.user as ITokenPayload;
            const result = await this.taskRepository.deleteTask(taskId, userId);
            return generalResponse(200, true, result, "Task deleted successfully", res);
        } catch (error: any) {
            console.error("Error deleting task:", error);
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