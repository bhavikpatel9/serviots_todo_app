import type { IApiResponse } from "@/types/apiResponse.type";
import { getApi, postApi, putApi, deleteApi } from "../axios";
import type { AxiosRequestConfig } from "axios";

export interface TaskType {
    _id?: string;
    title: string;
    description?: string;
    status?: string;
}

export type TaskArrayResponse = IApiResponse<TaskType[]>;
export type SingleTaskResponse = IApiResponse<TaskType>;

export const getTasks = async (config?: AxiosRequestConfig) => {
    const response = await getApi<TaskArrayResponse>('/tasks', config);
    return response.data;
};

export const createTask = async (data: TaskType, config?: AxiosRequestConfig) => {
    const response = await postApi<SingleTaskResponse>('/tasks', data, config);
    return response.data;
};

export const updateTask = async (id: string, data: Partial<TaskType>, config?: AxiosRequestConfig) => {
    const response = await putApi<SingleTaskResponse>(`/tasks/${id}`, data, config);
    return response.data;
};

export const deleteTask = async (id: string, config?: AxiosRequestConfig) => {
    const response = await deleteApi<IApiResponse<null>>(`/tasks/${id}`, config);
    return response.data;
};