import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { generalResponse } from "../utils";

export const joiValidationMiddleware = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction): void => {

    if (!req.body) {
        generalResponse(400, false, null, 'Invalid payload', res);
        return;
    }
    const { error } = schema.validate(req.body);
    if (error) {
        generalResponse(400, false, null, error.details[0].message, res);
        return;
    }

    next();
}
