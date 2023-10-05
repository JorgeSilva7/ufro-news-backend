import { listEvents } from "../components/event/index.js";

/**
 * Return a list of events
 * @param {Express.Request} req Express request
 * @param {Express.Response} res Express response
 * @returns {Express.Response}
 */
export async function list(req, res) {
	const events = await listEvents();
	return res.status(200).send({ events });
}
