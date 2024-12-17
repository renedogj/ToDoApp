import Label from "../models/labelModel.js";

export async function getLabels (req, res) {
	try {
		const labels = await Label.find();
		res.status(200).json(labels);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export async function createLabel (req, res) {
	try {
		const label = new Label(req.body);
		await label.save();
		res.status(201).json(label);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export default {
	getLabels,
	createLabel
}