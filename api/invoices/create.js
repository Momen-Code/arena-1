const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const InvoiceModel = require("../../models/Invoice.model");

router.post("/", async (req, res) => {
  try {
    const { CustomerName, email, InvoiceItems } = req.body;

    if (!CustomerName)
      return res.json({
        status: false,
        message: "You must type the client name",
      });
    if (!email)
      return res.json({
        status: false,
        message: "You must type the client email",
      });
    if (
      !InvoiceItems ||
      !Array.isArray(InvoiceItems) ||
      InvoiceItems.length == 0
    )
      return res.json({
        status: false,
        message: "You must add items to the invoice",
      });

    /*********************************************/
    //Calculate invoice value
    let InvoiceValue = 0;

    InvoiceItems.map((item) => {
      InvoiceValue += item.UnitPrice * item.Quantity;
    });

    const invoice = await InvoiceModel.create({
      CustomerName,
      email,
      InvoiceItems,
      InvoiceValue,
    });

    //Send email to the client
    const transporter = nodemailer.createTransport({
      host: "premium35.web-hosting.com",
      port: 465,
      auth: {
        user: "sales@arenahub.co",
        pass: "arena$admin",
      },
    });

    await transporter.sendMail({
      from: "sales@arenahub.co",
      to: email,
      subject: "Arena Media: Pay your Bill",
      html: `
			<p>Hello, ${CustomerName}</p>
			<br/>
			<p>You have a new invoice to pay,</p>
			<p>Amount: <h3>${InvoiceValue} SAR</h3></p>
			<br/><a href="${req.protocol}://192.168.1.102:3006/pay-invoice/${invoice._id}">Click here to pay</a>`,
    });

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
