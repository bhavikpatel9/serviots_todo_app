import { EMAIL_REGEX, NAME_MIN_LENGTH, PASSWORD_MIN_LENGTH } from "../constant";
import Joi from "joi";

export const emailValidationString = Joi.string()
    .pattern(EMAIL_REGEX)
    .required()
    .messages({
        "string.pattern.base": "email must be a valid email address",
        "string.empty": "email is required",
        "any.required": "email is required",
    })

export const nameValidationString = Joi.string()
    .required()
    .min(NAME_MIN_LENGTH)
    .messages({
        "string.empty": "name is required",
        "any.required": "name is required",
        "string.min": `name must be at least ${NAME_MIN_LENGTH} characters long`,
    })

export const passwordValidationString = Joi.string()
    .required()
    .min(PASSWORD_MIN_LENGTH)
    .messages({
        "string.empty": "password is required",
        "any.required": "password is required",
        "string.min": `password must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    })

export const registerValidationSchema = Joi.object({
    name: nameValidationString,
    email: emailValidationString,
    password: passwordValidationString,
});

export const loginValidationSchema = Joi.object({
    email: emailValidationString,
    password: Joi.string()
        .required()
        .messages({
            "string.empty": "Password is required",
            "any.required": "Password is required",
        }),
});

