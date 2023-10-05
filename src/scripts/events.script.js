import { load } from "cheerio";
import { getRequest } from "../utils/axios.js";
import crypto from "crypto";

const BASE_URL = "https://www.ufro.cl";

/**
 * Get events from UFRO page (/agenda) and extract relevant data from the body response
 * @returns {Event[]} a list of events extracted from web
 */
export default async function getEvents() {
	let events = [];

	console.log("Trying get the events data");
	const data = await getRequest("https://www.ufro.cl/index.php/agenda");

	// Get the HTML code of the webpage
	const $ = load(data);

	console.log("Data loaded on cheerio");

	$("div.ic-event").each((_index, el) => {
		const eventDOM = $(el).find("div > div");
		const day = $(eventDOM).find("div > .ic-day").text().trim();
		const month = $(eventDOM).find("div > .ic-month").text().trim();
		const year = $(eventDOM).find("div > .ic-year").text().trim();

		const title = $(eventDOM).find("div").next().find("div > h2").text().trim();
		const source = `${BASE_URL}${$(eventDOM)
			.find("div")
			.next()
			.find("div > h2 > a")
			.attr("href")}`;

		const id = crypto.createHash("md5").update(title).digest("hex");

		events.push({ id, day, month, year, title, source });
	});

	return events;
}
