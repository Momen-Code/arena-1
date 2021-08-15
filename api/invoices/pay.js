const express = require("express");
const router = express.Router();
const InvoiceModel = require("../../models/Invoice.model");
const { MY_FATOORAH_TOKEN, MY_FATOORAH_API } = process.env;
const axios = require("axios");

router.post("/", async (req, res) => {
  try {
    const { _id, PaymentMethodId } = req.body;

    //Validation
    if (!_id || _id.length != 24)
      return res.json({
        status: false,
        message:
          "Please open the invoice from the link that was sent to you via email",
      });

    if (!!!PaymentMethodId)
      return res.json({
        status: false,
        message: "You must choose the payment method first",
      });
    /*******************************************/

    let invoice = await InvoiceModel.findById(_id).lean();

    if (!invoice)
      return res.json({
        status: false,
        message:
          "Please open the invoice from the link that was sent to you via email",
      });

    //Call the InitiatePayment to get available payment methods from myfatoorah
    const response = await axios.post(
      `${MY_FATOORAH_API}/ExecutePayment`,
      {
        InvoiceValue: invoice.InvoiceValue * 1.15,
        PaymentMethodId,
        CustomerName: invoice.CustomerName,
        DisplayCurrencyIso: invoice.DisplayCurrencyIso,
        Language: req.header["Accept-Language"]?.toUpperCase() || "EN",
        CallbackUrl: "https://arenahub.co/",
        ErrorUrl: "https://arenahub.co/",
        InvoiceItems: [
          ...invoice.InvoiceItems.map((item) => ({
            ItemName: item.ItemName,
            Quantity: item.Quantity,
            UnitPrice: item.UnitPrice,
          })),
          {
            ItemName: "VAT %15",
            Quantity: 1,
            UnitPrice: invoice.InvoiceValue * 0.15,
          },
        ],
      },

      { headers: { Authorization: `Bearer ${MY_FATOORAH_TOKEN}` } }
    );
    const data = await response.data;

    if (!data.IsSuccess)
      return res.json({
        status: false,
        message: "Error occurred on the payment gateway",
      });

    return res.json({
      status: true,
      message: "Invoice executed successfully",
      data: data.Data,
    });
  } catch (e) {
    console.log(`Error in /invoices/pay, ${e.message}`, e);
    if (!res.headersSent)
      return res.json({ status: false, message: "Error occured" });
  }
});

module.exports = router;
