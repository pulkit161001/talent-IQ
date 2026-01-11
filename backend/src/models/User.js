import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		profileImage: {
			type: String,
			default: "",
		},
		// reference to clerk
		clerkId: {
			type: String,
			required: true,
			unique: true,
		},
	},
	// createdAt, updatedAt
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
