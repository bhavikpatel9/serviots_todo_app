export interface IApiResponse<T> {
    statusCode: number;
    success: boolean;
    data: T;
    message: string;
}