import Joi from "joi";
import { TASK_STATUS } from "../constant";

export const titleValidationString = Joi.string()
    .required()
    .messages({
        "string.empty": "title is required",
        "any.required": "title is required",
    });

export const descriptionValidationString = Joi.string()
    .optional()
    .allow("")
    .messages({
        "string.empty": "description cannot be empty",
    });

export const taskIdValidationString = Joi.string()
    .required()
    .messages({
        "string.empty": "taskId is required",
        "any.required": "taskId is required",
    });

export const statusValidationString = Joi.string()
    .optional()
    .valid(TASK_STATUS.PENDING, TASK_STATUS.COMPLETED)
    .messages({
        "any.only": `status must be one of ${Object.values(TASK_STATUS).join(", ")}`,
    });

export const createTaskValidationSchema = Joi.object({
    title: titleValidationString,
    description: descriptionValidationString,
});

export const updateTaskValidationSchema = Joi.object({
    title: titleValidationString.optional(),
    description: descriptionValidationString,
    status: statusValidationString,
});

export const deleteTaskValidationSchema = Joi.object({
    taskId: taskIdValidationString,
});
