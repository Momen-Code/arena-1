const express = require("express");
const router = express.Router();
const InvoiceModel = require("../../models/Invoice.model");
const functions = require("firebase-functions");
const {
  MY_FATOORAH_TOKEN,
  MY_FATOORAH_API
} = process.env;

const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const {
      _id
    } = req.body;

    if (!_id || _id.length != 24)
      return res.json({
        status: false,
        message: "Please open the invoice from the link that was sent to you via email",
      });

    let invoice = await InvoiceModel.findById(_id).lean();

    //Validation
    if (!invoice)
      return res.json({
        status: false,
        message: "Please open the invoice from the link that was sent to you via email",
      });
    if (invoice.status == "paid")
      return res.json({
        status: true,
        message: `You have already paid the invoice ${invoice.referenceId}`,
      });

    if (invoice.status == "canceled")
      return res.json({
        status: true,
        message: `Sorry, Invoice ${invoice.referenceId} has been canceled.`,
      });

    //Call the InitiatePayment to get available payment methods from myfatoorah
    const response = await axios.post(
      `${MY_FATOORAH_API || functions.config().my_fatoorah.url}/InitiatePayment`, {
        InvoiceAmount: invoice.InvoiceValue * 1.15, //Vat
        CurrencyIso: invoice.DisplayCurrencyIso,
      },

      {
        headers: {
          Authorization: `Bearer ${MY_FATOORAH_TOKEN || functions.config().my_fatoorah.access_token}`
        }
      }
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
      message: "Invoice retreived successfully",
      data: invoice,
    });
  } catch (e) {
    console.log(`Error in /invoices/myinvoice, ${e.message}`, e);
    if (!res.headersSent)
      return res.json({
        status: false,
        message: "Error occured"
      });
  }
});

module.exports = router;