import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
	console.error("Stream STREAM_API_KEY OR STREAM_API_SECRET is missing");
}

export const streamClient = new StreamClient(apiKey, apiSecret); //this will be used for video calls
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //this will be used for char features

// upsert means update or create the data
export const upsertStreamUser = async (userData) => {
	try {
		//this will create data in stream
		await chatClient.upsertUser(userData);
		console.log("Stream user upserted successfully", userData);
	} catch (error) {
		console.error("Error upserting stream user", error);
	}
};

export const deleteStreamUser = async (userId) => {
	try {
		//this will create data in stream
		await chatClient.deleteUser(userId);
		console.log("Stream user deleted successfully", userId);
	} catch (error) {
		console.error("Error deleting the stream user", error);
	}
};
