import mongoose from "mongoose";
import { envConfig } from "./env.config";

export const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(envConfig.MONGO_URI as string);
        console.log(`MongoDB connected`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}
