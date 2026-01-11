import dotenv from "dotenv";
// quiet will not show how many env variables in the terminal
dotenv.config({ quiet: "true" });

export const ENV = {
	PORT: process.env.PORT,
	DB_URL: process.env.DB_URL,
	NODE_ENV: process.env.NODE_ENV,
};
