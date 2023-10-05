import { newsModel } from "../../models/index.js";
import checkIfExists from "../../utils/check-if-exists.js";

/**
 * Save a list of news on database. Only if no exists yet
 * @param {News} news News list from script
 * @returns {Promise<boolean>}
 */
export default async function saveNews(news) {
	try {
		await Promise.all(
			news
				.map(async (n) => {
					const exists = await checkIfExists({
						model: newsModel,
						query: { newsId: n.id },
					});
					console.log(`${n.id} ${exists ? "already exists" : "doesnt exists"}`);

					if (!exists) {
						return newsModel.create({
							newsId: n.id,
							title: n.title,
							imageUrl: n.imageUrl,
							source: n.source,
							details: n.details,
						});
					}
				})
				.filter((n) => n)
		);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}
