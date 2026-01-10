import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.listen(ENV.PORT, () => {
	console.log("Server is running on ", ENV.PORT);
});
