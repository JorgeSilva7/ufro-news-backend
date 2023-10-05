import { eventModel } from "../../models/index.js";

/**
 * Get events from database
 * @returns {Events[]}
 */
export default async function listEvents() {
	const events = await eventModel.find({}).exec();
	return events;
}
