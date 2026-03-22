import * as Yup from 'yup';

const emailSchema = Yup.string()
    .trim()
    .required("Email is required")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address");

const passwordSchema = Yup.string()
    .trim()
    .required("Password is required")

const passwordWithMin4CharSchema = Yup.string()
    .trim()
    .required("Password is required")
    .min(4, "Password must be at least 4 characters long");

export { emailSchema, passwordSchema, passwordWithMin4CharSchema };

export type emailData = Yup.InferType<typeof emailSchema>;