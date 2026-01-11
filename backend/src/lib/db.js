import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
	try {
		if (!ENV.DB_URL) {
			throw new Error("DB_URL is not defined in environment variables");
		}
		const connection = await mongoose.connect(ENV.DB_URL);
		console.log("Connected to mongoDB:", connection.connection.host);
	} catch (error) {
		console.error("Error connecting to mongoDB", error);
		// 0 means success, 1 means failure
		process.exit(1);
	}
};
