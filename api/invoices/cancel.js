const express = require("express");
const router = express.Router();
const InvoiceModel = require("../../models/Invoice.model");

router.post("/", async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id)
      return res.json({ status: false, message: "Something wrong happend" });

    await InvoiceModel.updateOne({ _id }, { status: "canceled" });

   
    return res.json({
      status: true,
      message: "Invoice canceled successfully",
    });
  } catch (e) {
    console.log(`Error in /invoices/cancel, ${e.message}`, e);
    if (!res.headersSent)
      return res.json({ status: false, message: "Error occured" });
  }
});

module.exports = router;
