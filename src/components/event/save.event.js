import { eventModel } from "../../models/index.js";
import checkIfExists from "../../utils/check-if-exists.js";

/**
 * Save a list of events on database. Only if no exists yet
 * @param {Event} events Events list from script
 * @returns {Promise<boolean>}
 */
export default async function saveEvents(events) {
	try {
		await Promise.all(
			events
				.map(async (event) => {
					const exists = await checkIfExists({
						model: eventModel,
						query: { eventId: event.id },
					});
					console.log(
						`${event.id} ${exists ? "already exists" : "doesnt exists"}`
					);

					if (!exists) {
						return eventModel.create({
							eventId: event.id,
							title: event.title,
							day: event.day,
							month: event.month,
							year: event.year,
							source: event.source,
						});
					}
				})
				.filter((event) => event)
		);
		return true;
	} catch (err) {
		console.log(err);
		return false;
	}
}
