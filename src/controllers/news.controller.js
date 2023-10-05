import { listNews, getNewsById } from "../components/news/index.js";

/**
 * Return a list of news
 * @param {Express.Request} req Express request
 * @param {Express.Response} res Express response
 * @returns {Express.Response}
 */
export async function list(req, res) {
	const news = await listNews();
	return res.status(200).send({ news });
}

/**
 * Return one news by id
 * @param {Express.Request} req Express request
 * @param {string} req.params.newsId News id to return
 * @param {Express.Response} res Express response
 * @returns {Express.Response}
 */
export async function getById(req, res) {
	const newsId = req.params.newsId;
	const news = await getNewsById(newsId);

	if (!news) {
		return res.status(404).send({
			error: { name: "news_not_found", message: "news not found" },
		});
	}

	return res.status(200).send({ news });
}
