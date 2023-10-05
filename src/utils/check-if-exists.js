/**
 * Check if the input query return a document from input model
 * @param {Mongoose.Model} args.model - Mongose model
 * @param {Mongoose.Query} args.query - Mongoose query
 * @returns {boolean} true if exists
 */
export default async function checkIfExists({ model, query }) {
	const exists = !!(await model.findOne(query).exec());
	return exists;
}
