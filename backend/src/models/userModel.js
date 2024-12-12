import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: String,
	email: { type: String, unique: true },
	password: String,
	categories: [
		{
			categoryId: mongoose.Schema.Types.ObjectId,
			name: String,
		},
	],
}, { timestamps: true });

export default mongoose.model("users", userSchema);