import * as Yup from 'yup';

export const taskSchema = Yup.object({
    title: Yup.string().trim().required("Title is required"),
    description: Yup.string().trim().optional(),
});

export type TaskFormData = Yup.InferType<typeof taskSchema>;
