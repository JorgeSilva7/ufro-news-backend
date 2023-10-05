import { load } from "cheerio";
import { getRequest } from "../utils/axios.js";
import crypto from "crypto";

const BASE_URL = "https://www.ufro.cl";

/**
 * Get news from UFRO page (/noticias) and extract relevant data from the body response
 * @returns {News[]} a list of news extracted from web
 */
export default async function getNews() {
	let news = [];

	console.log("Trying get the news data");
	const data = await getRequest("https://www.ufro.cl/index.php/noticias");

	// Get the HTML code of the webpage
	const $ = load(data);

	console.log("Data loaded on cheerio");

	// Find all elements with ui-search-result__wrapper class, in div element.
	$("div.yv_slideitems").each((_index, el) => {
		const imageDOM = $(el).find("div > div > a > img");
		const imageUrl = `${BASE_URL}${$(imageDOM).attr("src")}`;

		const titleDOM = $(el).find("div").next().find("a");
		const title = titleDOM.text().replace(/\t/g, "").replace(/\n/g, "");

		const source = `${BASE_URL}${titleDOM.attr("href")}`;

		const id = crypto.createHash("md5").update(title).digest("hex");

		news.push({ id, imageUrl, title, source });
	});

	await Promise.all(news.map((n) => getNewsById(n)));

	return news;
}

/**
 * Get a news detail from news page and extract photos, resume and body
 */
async function getNewsById(news) {
	console.log("Trying to get news details");

	const data = await getRequest(news.source);

	const $ = load(data);

	const newsDetail = {
		images: [],
		body: "",
	};
	$("table.tnoticia").each((_index, el) => {
		$(el)
			.find("tbody > tr > td#imagen")
			.find("p")
			.each((index, el) => {
				const image = $(el).find("a").attr("href");
				if (image) {
					newsDetail.images.push(image);
				}
			});

		newsDetail.resume = $(el).find("tbody > tr > td").find("p.bajada").text();
	});
	$("table.tnoticia").each((_index, el) => {
		newsDetail.body = $(el).find("tbody > tr > td").next().html();
	});

	news.details = newsDetail;
	console.log("News details loaded");
}
