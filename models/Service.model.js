const mongoose = require("mongoose");

const SubServiceSchema = new mongoose.Schema({
	title: { type: String, required: true },
	cover: { type: String, required: true },
});

const ServiceSchema = new mongoose.Schema({
	title: { type: String, unique: true },
	description: String,
	subservices: { type: [SubServiceSchema] },
	createDate: {
		type: Date,
		default: Date.now(),
	},
});
const finalSchema = new mongoose.Schema({
	ar: {
		type: ServiceSchema,
		required: true,
	},
	en: {
		type: ServiceSchema,
		required: true,
	},
	slug: { type: String, unique: true },
	cover: String,
});

module.exports = mongoose.model("Service", finalSchema, "serivces");
