import mongoose from "mongoose";
// import { getClient, getdb } from "../db/conection.js";

const taskSchema = new mongoose.Schema({
	userId: mongoose.Schema.Types.ObjectId,
	title: String,
	description: String,
	statusId: { type: Number, default: 2 },
	status: { type: String, default: "pending" },
	// priority: { type: String, default: "medium" },
	labels: [mongoose.Schema.Types.ObjectId],
	dueDate: Date,
	// sharedWith: [mongoose.Schema.Types.ObjectId],
}, { timestamps: true });

export default mongoose.model("tasks", taskSchema);