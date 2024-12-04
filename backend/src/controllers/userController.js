import Users from "../models/userModel.js";


export async function getUsers(req, res) {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export async function createUser(req, res) {
    try {
        const Users = new Users(req.body);
        await Users.save();
        res.status(201).json(Users);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// function checkNewUser(userJson) {
// 	let email = userJson.email.trim();
// 	let name = userJson.name.trim();
// 	let password = userJson.password.trim()
// 	return (
// 		email != null && email != "" && 
// 		name != null && name != "" &&
// 		password != null && password != ""
// 	);
// }

export default {
    getUsers,
    createUser
}