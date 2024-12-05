console.clear();
import express from 'express';
import dotenv from 'dotenv';
import { connectDB }  from "./db/conection.js";
import router from "./routes/routes.js";
import cors from 'cors';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.text());
app.use(cors());

app.use("/", router);

connectDB().then(() => {
	app.listen(port, () => {
		console.log(`Servidor escuchando en http://localhost:${port}`);
	})
}).catch((e) => {
	console.log(e);
})