import express from "express";
import newsRouter from "./routers/news.router.js";
import eventRouter from "./routers/event.router.js";
import envs from "./config/envs.config.js";
import connectDB from "./config/mongo.config.js";
import initializeCron from "./config/cron.config.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use("", newsRouter);
app.use("", eventRouter);

const { PORT } = envs;

/**
 * Start express server
 */
async function startSever() {
	const isConnected = await connectDB();
	if (isConnected) {
		app.listen(PORT, () => {
			console.log(`Server started on ${PORT}`);
		});

		initializeCron();
	} else {
		process.exit();
	}
}

startSever();
