import { Response } from "express";
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { StringValue } from "ms";

//function to send general response
export const generalResponse = <T>(
    statusCode: number,
    success: boolean,
    dataObj: T,
    msg: string,
    res: Response
) => {
    return res
        .status(200)
        .json({ statusCode, success, data: dataObj, message: msg });
};

export const hashPassword = async (plain: string, saltRounds: number): Promise<string> => {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(plain, salt);
};

export const comparePassword = async (
    plain: string,
    hashed: string
): Promise<boolean> => {
    return bcrypt.compare(plain, hashed);
};

export interface ITokenPayload {
    id: string;
    email: string;
}

export const generateToken = async (payload: ITokenPayload, expiresIn?: StringValue | number): Promise<string> => {
  const signOptions: SignOptions = { expiresIn };
  return jwt.sign(payload, process.env.JWT_SECRET as string, signOptions);
}

export const isValidObjectId = (id: string): boolean => /^[a-f0-9]{24}$/i.test(id ?? "");

export const verifyToken = (token: string): ITokenPayload => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof decoded === "string") {
        throw new Error("Invalid token payload");
    }

    return decoded as ITokenPayload;
}


