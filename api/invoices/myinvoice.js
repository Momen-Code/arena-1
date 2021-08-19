const express = require("express");
const router = express.Router();
const InvoiceModel = require("../../models/Invoice.model");
const { MY_FATOORAH_TOKEN, MY_FATOORAH_API } = process.env;
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { _id } = req.body;

    if (!_id || _id.length != 24)
      return res.json({
        status: false,
        message:
          "Please open the invoice from the link that was sent to you via email",
      });

    let invoice = await InvoiceModel.findById(_id).lean();

    if (!invoice)
      return res.json({
        status: false,
        message:
          "Please open the invoice from the link that was sent to you via email",
      });

    //Call the InitiatePayment to get available payment methods from myfatoorah
    const response = await axios.post(
      `${MY_FATOORAH_API}/InitiatePayment`,
      {
        InvoiceAmount: invoice.InvoiceValue * 1.15, //Vat
        CurrencyIso: invoice.DisplayCurrencyIso,
      },

      { headers: { Authorization: `Bearer ${MY_FATOORAH_TOKEN}` } }
    );
    const data = await response.data;

    if (!data.IsSuccess)
      return res.json({
        status: false,
        message: "Error occurred on the payment gateway",
      });

    invoice.paymentMethods = data.Data.PaymentMethods;

    return res.json({
      status: true,
      message: "Invoice create successfully",
      data: invoice,
    });
  } catch (e) {
    console.log(`Error in /invoices/create, ${e.message}`, e);
    if (!res.headersSent)
      return res.json({ status: false, message: "Error occured" });
  }
});

module.exports = router;
