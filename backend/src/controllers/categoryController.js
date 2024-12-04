import Category from "../models/categoryModel.js";

export async function getCategories (req, res) {
	try {
		const categories = await Category.find();
		res.status(200).json(categories);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

export async function createCategory (req, res) {
	try {
		const category = new Category(req.body);
		await category.save();
		res.status(201).json(category);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
};

export default {
	getCategories,
	createCategory
}