import mongoose from "mongoose";
// import { getClient, getdb } from "../db/conection.js";

const taskSchema = new mongoose.Schema({
	userId: mongoose.Schema.Types.ObjectId,
	title: String,
	description: String,
	status: { type: String, default: "pending" },
	priority: { type: String, default: "medium" },
	categoryId: mongoose.Schema.Types.ObjectId,
	dueDate: Date,
	sharedWith: [mongoose.Schema.Types.ObjectId],
}, { timestamps: true });

export default mongoose.model("tasks", taskSchema);