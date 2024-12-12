import Task from "../models/taskModel.js";

export async function getTasks(req, res) {
	try {
		const tasks = await Task.find();
		// const tasks = await Task.getTasks();
		res.status(200).json(tasks);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
}

export async function createTask(req, res) {
	try {
		const task = new Task(req.body);
		await task.save();
		res.status(201).json(task);
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
}

export default {
	getTasks,
	createTask
}