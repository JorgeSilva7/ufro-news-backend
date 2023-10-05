import mongoose from "mongoose";
import Envs from "./envs.config.js";

/**
 * Connect mongo database
 * @returns {Promise<void>}
 */
export default function connectDB() {
	return mongoose
		.connect(Envs.MONGO_URI)
		.then(async () => {
			console.log("MongoDB connected successfully");
			await registerModels();
			return true;
		})
		.catch((error) => {
			console.log(`MongoDB not connected. Error: ${error}`);
			return false;
		});
}

/**
 * Optional: In this method u can import all models in order to force register collections in database
 */
async function registerModels() {
	await import("../models/news.model.js");
}
