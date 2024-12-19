import mongoose from "mongoose";

const labelSchema = new mongoose.Schema({
	userId: mongoose.Schema.Types.ObjectId,
	name: String
}, { timestamps: true });

export default mongoose.model("Label", labelSchema);