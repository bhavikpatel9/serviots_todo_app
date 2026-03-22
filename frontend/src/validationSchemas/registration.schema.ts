import * as Yup from 'yup';
import { emailSchema, passwordWithMin4CharSchema } from '@/validationSchemas/common.schema';

export const registrationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required").min(2, "Name must be at least 2 characters"),
    email: emailSchema,
    password: passwordWithMin4CharSchema,
});

export type RegistrationFormType = Yup.InferType<typeof registrationSchema>;
