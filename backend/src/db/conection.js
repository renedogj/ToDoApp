import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		// console.log("Conexión a la base de datos exitosa");
	} catch (err) {
		console.error("Error al conectar a la base de datos", err);
		process.exit(1);
	}
};