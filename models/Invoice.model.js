const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const InvoiceSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	amount: { type: Number, required: true },
	status: { type: String, enum: ["unpaid", "paid", "canceled"], default: "unpaid" },
	createDate: {
		type: Date,
		default: Date.now(),
	},
});

InvoiceSchema.plugin(autoIncreament.plugin, { model: "Invoice", startAt: 1 });

module.exports = mongoose.model("Invoice", InvoiceSchema, "invoices");
