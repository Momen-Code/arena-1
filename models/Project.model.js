const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

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
	id: Number,
});

ProjectSchema.plugin(autoIncreament.plugin, { model: "Project", startAt: 1 });

module.exports = mongoose.model("Project", finalSchema, "projects");
