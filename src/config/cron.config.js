import cron from "node-cron";
import getNewsScript from "../scripts/news.script.js";
import getEventsScript from "../scripts/events.script.js";
import saveNews from "../components/news/save.news.js";
import saveEvents from "../components/event/save.event.js";
import envs from "./envs.config.js";

const { CRON_CONFIG } = envs;

/**
 * Get events flow
 */
async function getEvents() {
	const events = await getEventsScript();
	console.log(`${events.length} events loaded`);
	const result = await saveEvents(events);
	console.log(
		`EVENTS: ${result ? "SUCCESS" : "FAILED"} at ${new Date().toISOString()}`
	);
}

/**
 * Get news flow
 */
async function getNews() {
	const news = await getNewsScript();
	console.log(`${news.length} news loaded`);
	const result = await saveNews(news);
	console.log(
		`NEWS: ${result ? "SUCCESS" : "FAILED"} at ${new Date().toISOString()}`
	);
}

/**
 * Initialize cron with node-cron
 */
const initializeCron = async () => {
	console.log("CRON HAS BEEN INITIALIZED");
	cron.schedule(CRON_CONFIG, () => {
		getEvents();
		getNews();
	});
};

export default initializeCron;
