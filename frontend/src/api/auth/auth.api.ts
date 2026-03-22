import type { AxiosRequestConfig } from 'axios';
import { postApi } from "@/api/axios";
import type { RegistrationFormType } from '@/validationSchemas/registration.schema';
import type { IApiResponse } from '@/types/apiResponse.type';

export interface LoginType {
    email: string;
    password: string;
}

export type LoginUserResponse = IApiResponse<{
    token: string;
    name: string;
    email: string;
}>

export type IRegisterUserResponse = IApiResponse<null>

export const loginUser = async (data: LoginType, config?: AxiosRequestConfig) => {
    const response = await postApi<LoginUserResponse>('/auth/login', data, config);
    return response.data;
};

export const registerUser = async (data: RegistrationFormType, config?: AxiosRequestConfig) => {
    const response = await postApi<IRegisterUserResponse>('/auth/register', data, config);
    return response.data;
};
