import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
const app = express();
const __dirname = path.resolve();

app.get("/health", (req, res) => {
	res.status(200).json({ msg: "health endpoint" });
});
app.get("/books", (req, res) => {
	res.status(200).json({ msg: "books endpoint" });
});

// make our app ready for production
if (ENV.NODE_ENV == "production") {
	// make dist folder from frontend and make it static asset
	// from here (current directory) to frontend/dist
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	// endpoint (* : every)
	app.get("/{*any}", (req, res) => {
		// from here to where (either write like path or comma seperated)
		res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
	});
}
app.listen(ENV.PORT, () => {
	console.log("Server is running on ", ENV.PORT);
});
