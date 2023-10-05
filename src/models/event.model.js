import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
	{
		eventId: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		title: {
			type: String,
			required: true,
		},
		day: {
			type: String,
			required: true,
		},
		month: {
			type: String,
			required: true,
		},
		year: {
			type: String,
			required: true,
		},
		source: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const eventModel = mongoose.model("Event", eventSchema);

export default eventModel;
