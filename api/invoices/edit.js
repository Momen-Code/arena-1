const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const InvoiceModel = require("../../models/Invoice.model");

router.post("/", async (req, res) => {
  try {
    //Only edit ceateDate for now
    const { _id, createDate } = req.body;

    if (!createDate)
      return res.json({
        status: false,
        message: "You must select the date of the invoice",
      });

    /*********************************************/

    const invoice = await InvoiceModel.updateOne(
      {
        _id,
      },
      { createDate }
    );

    if (!invoice.nModified) return res.json({ status: false, message: "Something wrong happaned, please try again." });

    return res.json({
      status: true,
      message: "Invoice edited successfully",
      data: invoice,
    });
  } catch (e) {
    console.log(`Error in /invoices/edit, ${e.message}`, e);
    if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
  }
});

module.exports = router;
