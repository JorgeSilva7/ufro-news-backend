import { newsModel } from "../../models/index.js";

/**
 * Get news from database and select the required data
 * @returns {News[]}
 */
export default async function listNews() {
	const news = await newsModel
		.find({})
		.select("newsId title source imageUrl")
		.exec();
	return news;
}
