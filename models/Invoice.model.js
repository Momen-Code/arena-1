const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  InvoiceValue: Number,
  CustomerName: String,
  email: String,
  DisplayCurrencyIso: { type: String, default: "SAR" },
  referenceId: { type: String, required: true },
  status: {
    type: String,
    enum: ["unpaid", "paid", "canceled"],
    default: "unpaid",
  },
  InvoiceItems: [
    {
      ItemName: {
        type: String,
        required: true,
      },
      Quantity: {
        type: Number,
        required: true,
      },
      UnitPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  createDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Invoice", InvoiceSchema, "invoices");
