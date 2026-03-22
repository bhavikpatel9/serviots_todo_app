import * as Yup from 'yup';
import { emailSchema, passwordSchema } from '@/validationSchemas/common.schema';

const loginSchema = Yup.object({
    email: emailSchema,
    password: passwordSchema,
});

export { loginSchema };

export type LoginFormData = Yup.InferType<typeof loginSchema>;