import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(
	cors({
		origin: ENV.CLIENT_URL,
		//means server allow a browser to include cookies on request
		credentials: true,
	})
);

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/health", (req, res) => {
	res.status(200).json({ msg: "health endpoint" });
});
app.get("/books", (req, res) => {
	res.status(200).json({ msg: "books endpoint" });
});

// make our app ready for production
if (ENV.NODE_ENV === "production") {
	const frontendPath = path.join(__dirname, "../../frontend/dist");

	app.use(express.static(frontendPath));

	app.use((req, res) => {
		res.sendFile(path.join(frontendPath, "index.html"));
	});
}

const startServer = async () => {
	try {
		await connectDB();
		app.listen(ENV.PORT, () => {
			console.log("Server is running on ", ENV.PORT);
		});
	} catch (error) {
		console.error("Error starting the server", error);
	}
};

startServer();
