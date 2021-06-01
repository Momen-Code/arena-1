const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const BillSchema = new mongoose.Schema({
	billname: String,
	email: String,
	password: String,
	createDate: {
		type: Date,
		default: Date.now(),
	},
});

BillSchema.plugin(autoIncreament.plugin, { model: "Bill", startAt: 1 });

module.exports = mongoose.model("Bill", BillSchema, "bills");
