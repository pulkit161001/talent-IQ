import { StreamVideoClient } from "@stream-io/video-react-sdk";
const apiKey = import.meta.env.VITE_STREAM_API_KEY;

let client = null;
export const initializeStreamClient = async (user, token) => {
	//is client exists with the same user, instead of creating again return it
	if (client && client?.user?.id === user.id) return client;
	if (!apiKey) throw new Error("Stream API key is not provided");

	//if user already in the call
	if (client) {
		await disconnectStreamClient();
	}

	client = new StreamVideoClient({ apiKey, user, token });
	return client;
};

export const disconnectStreamClient = async (user, token) => {
	if (client) {
		try {
			await client.disconnectUser();
			client = null;
		} catch (error) {
			console.error("Error disconnecting Stream client:", error);
		}
	}
};
