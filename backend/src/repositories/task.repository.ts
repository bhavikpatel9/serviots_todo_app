import { Task } from "../models/Task.model";

export default class TaskRepository {
    public createTask = async (task: { title: string, description: string, userId: string }) => {
        const createdTask = await Task.create(task);
        return {
            id: createdTask._id,
            title: createdTask.title,
            description: createdTask.description,
            status: createdTask.status,
            userId: createdTask.userId,
        }
    }

    public getAllTasks = async (userId: string) => {
        return await Task.find({ userId }, { __v: 0 });
    }

    public updateTask = async (taskId: string, userId: string, task: { title: string, description: string, status: string }) => {
        const taskData = await Task.findById(taskId);
        if (!taskData) {
            throw new Error("Task not found");
        }
        if (taskData.userId.toString() !== userId) {
            throw new Error("Unauthorized");
        }
        const updatedTask = await Task.findByIdAndUpdate(taskId, task, { returnDocument: "after" });
        return {
            id: updatedTask!._id,
            title: updatedTask!.title,
            description: updatedTask!.description,
            status: updatedTask!.status,
            userId: updatedTask!.userId,
        }
    }

    public deleteTask = async (taskId: string, userId: string) => {
        const taskData = await Task.findById(taskId);
        if (!taskData) {
            throw new Error("Task not found");
        }
        if (taskData.userId.toString() !== userId) {
            throw new Error("Unauthorized");
        }
        const deletedTask = await Task.findByIdAndDelete(taskId);
        return {
            id: deletedTask!._id,
            title: deletedTask!.title,
            description: deletedTask!.description,
            status: deletedTask!.status,
            userId: deletedTask!.userId,
        }
    }
}
