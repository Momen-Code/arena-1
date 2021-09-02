const express = require("express");
const router = express.Router();
const InvoiceModel = require("../../models/Invoice.model");

router.post("/", async (req, res) => {
  try {
    const invoices = await InvoiceModel.find({});

    if (invoices.length == 0)
      return res.json({
        status: false,
        message: "There are no invoices created yet!",
      });

    return res.json({
      status: true,
      message: "Invoices retreived successfully",
      data: invoices,
    });
  } catch (e) {
    console.log(`Error in /invoices/all, ${e.message}`, e);
    if (!res.headersSent)
      return res.json({ status: false, message: "Error occured" });
  }
});

module.exports = router;
