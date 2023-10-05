import mongoose from "mongoose";

const newsSchema = new mongoose.Schema(
	{
		newsId: {
			type: String,
			required: true,
			unique: true,
			index: true,
		},
		title: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
		},
		source: {
			type: String,
			required: true,
		},
		details: {
			images: [String],
			body: String,
			resume: String,
		},
	},
	{ timestamps: true }
);

const newsModel = mongoose.model("News", newsSchema);

export default newsModel;
