import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
	// first function call
	// https://clerk.com/docs/expressjs/getting-started/quickstart
	// this is a clerk middleware which will check authenticated user
	// if not authenticated it will redirect to this route
	// requireAuth({ signInUrl: "/sign-in" }),
	requireAuth(),
	// second function call
	async (req, res, next) => {
		try {
			// clerk will add auth to the request if user is authenticated, from that we can get userId
			const clerkId = req.auth().userId;
			if (!clerkId)
				return res
					.status(401)
					.json({ message: "Unauthorized - invalid token" });
			// find user in db by clerkId
			const user = await User.findOne({ clerkId: clerkId });
			if (!user)
				return res
					.status(404)
					.json({ message: "User not found in the DB" });
			//attach user to req
			req.user = user;
			next();
		} catch (error) {
			console.log("Error in protectRoute middleware", error);
			res.status(500).json({ message: "Internal Server Error" });
		}
	},
];
