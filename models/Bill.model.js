const mongoose = require("mongoose");

const amountSchema = new mongoose.Schema({
  value: { type: Number, required: true },
  currencyCode: { type: String, required: true },
});

const ItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const BillSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  email: { type: String, required: true },
  description: { type: String, required: true },
  amount: { type: [amountSchema], required: true },
  items: { type: [ItemSchema] },
  status: {
    type: String,
    enum: ["unpaid", "paid", "canceled"],
    default: "unpaid",
  },
  paymentMethod: { type: String, enum: ["paypal", "myfatoorah"] },
  billDate: { type: Date, required: true },
  createDate: {
    type: Date,
    default: Date.now(),
  },
});


module.exports = mongoose.model("Bill", BillSchema, "bills");
