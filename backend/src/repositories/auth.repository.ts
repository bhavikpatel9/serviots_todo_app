import { Types } from "mongoose";
import { User } from "../models/User.model";
import { comparePassword, generateToken, hashPassword, ITokenPayload } from "../utils";

export default class AuthRepository {
    public register = async (user: { name: string, email: string, password: string }) => {
        const userExists = await User.findOne({ email: user.email });

        if (userExists) {
            throw new Error("User already exists");
        }

        user.password = await hashPassword(user.password, 10);
        const userCreated = await User.create(user);
        return {
            id: userCreated._id,
            name: userCreated.name,
            email: userCreated.email,
        }
    }

    public login = async (user: { email: string, password: string }) => {
        const userExists = await User.findOne({ email: user.email });

        if (!userExists) {
            throw new Error("Invalid Credential");
        }

        const isPasswordValid = await comparePassword(user.password, userExists.password);
        if (!isPasswordValid) {
            throw new Error("Invalid Credential");
        }

        const tokenPayload: ITokenPayload = {
            id: userExists.id,
            email: userExists.email,
        };

        const token = await generateToken(tokenPayload, "8h")

        return {
            token,
            email: userExists.email,
            name: userExists.name,
        };
    }
}