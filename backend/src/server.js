import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import { protectRoute } from "./middleware/protectRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoute.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable the JSON middleware
app.use(express.json());
app.use(
	cors({
		origin: ENV.CLIENT_URL,
		//means server allow a browser to include cookies on request
		credentials: true,
	})
);
app.use(clerkMiddleware()); //this adds auth fields to request object : req.auth()

// if we hit this endpoint trigger inngest express function
// add frontend URL/endpoint in the inngest website Apps section
app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

app.get("/health", protectRoute, (req, res) => {
	res.status(200).json({ message: "health endpoint" });
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
