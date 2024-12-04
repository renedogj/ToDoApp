import mongoose from "mongoose";
// const DB_USER = process.env.DB_USER;
// const DB_PASS = process.env.DB_PASS;
// const url = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.khyn2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const url = "mongodb://localhost:27017/toDoApp";

// let clientConnection = null;
// let db;

// export const initConnection = async () => {
// 	return await MongoClient.connect(url).then((client) => {
// 		clientConnection = client;
// 		return client;
// 	}).catch((err) => {
// 		console.log(err)
// 	})
// }

// export const getdb = async  () => {
// 	await initConnection();
// 	return clientConnection.db();
// }

// export const getClient = () => {
// 	return clientConnection
// }

export const connectDB = async () => {
	try {
		await mongoose.connect(url);
		// console.log("Conexión a la base de datos exitosa");
	} catch (err) {
		console.error("Error al conectar a la base de datos", err);
		process.exit(1);
	}
};