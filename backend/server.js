console.clear();
import express from 'express';
import { connectDB }  from "./db/conection.js";
import router from "./routes/routes.js";

const app = express()
const port = 3000

app.use(express.json());
app.use(express.text());

app.use("/", router);

connectDB().then(() => {
	app.listen(port, () => {
		console.log(`Servidor escuchando en http://localhost:${port}`);
	})
}).catch((e) => {
	console.log(e);
})