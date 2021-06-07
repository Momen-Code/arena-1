const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
	title: String,
	description: String,
	createDate: {
		type: Date,
		default: Date.now(),
	},
});
const finalSchema = new mongoose.Schema({
	ar: {
		type: ProjectSchema,
		required: true,
	},
	en: {
		type: ProjectSchema,
		required: true,
	},
	slug: { type: String, unique: true },
	type: { type: String },
	slides: [String],
	thumbnail: String,
});

module.exports = mongoose.model("Project", finalSchema, "projects");
