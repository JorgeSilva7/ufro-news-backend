import { newsModel } from "../../models/index.js";

/**
 * Get news by id from database with all data
 * @returns {News}
 */
export default async function getNews(newsId) {
	const news = await newsModel.findOne({ newsId }).exec();
	return news;
}
