import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";

// inngest AppName
export const inngest = new Inngest({ id: "talent-iq" });

const syncUser = inngest.createFunction(
	// inngest -> AppName=talent-iq -> FunctionName=sync-user
	{ id: "sync-user" },
	// pick this from clerk
	{ event: "clerk/user.created" },
	// function (do this)
	async ({ event }) => {
		await connectDB();
		// this parameters we are getting from clerk after logging in with google
		const { id, email_addresses, first_name, last_name, image_url } =
			event.data;
		// create DB object and save it
		const newUser = {
			clerkId: id,
			email: email_addresses[0]?.email_address,
			name: `${first_name || ""} ${last_name || ""}`,
			profileImage: image_url,
		};
		await User.create(newUser);
		// also save it to stram
		await upsertStreamUser({
			id: newUser.clerkId.toString(),
			name: newUser.name,
			image: newUser.profileImage,
		});
	}
);

const deleteUserFromDB = inngest.createFunction(
	// inngest function name
	{ id: "delete-user-from-db" },
	// do when this clerk function triggers
	{ event: "clerk/user.deleted" },
	// run this function
	async ({ event }) => {
		await connectDB();
		// get the id from clerk data (it contains many fields)
		const { id } = event.data;
		// delete user whose clerkId is the given one
		await User.deleteOne({ clerkId: id });
		// delete stream user
		await deleteStreamUser(id.toString());
	}
);

// export array of functions
export const functions = [syncUser, deleteUserFromDB];
