const express = require("express");
const router = express.Router();
const BillModel = require("../../models/Bill.model");
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
	try {
		const { clientName, email, amount, billDate, description } = req.body;

		if (!clientName) return res.json({ status: false, message: "You must type the client name" });
		if (!email) return res.json({ status: false, message: "You must type the client email" });
		if (!description) return res.json({ status: false, message: "You must type description for the bill" });
		if (!amount || amount.length != 2)
			return res.json({ status: false, message: "You must set the amount to be collected from the client" });
		if (!billDate) return res.json({ status: false, message: "You must select the date of the bill" });

		const bill = await BillModel.create({
			clientName,
			email,
			description,
			amount,
			billDate,
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
			<p>Hello, ${clientName}</p>
			<br/>
			<p>You have a new bill to pay, you can pay in ${amount[0].currencyCode} or ${amount[1].currencyCode}</p>
			<p>Amount: <h3>${amount[0].value + " " + amount[0].currencyCode}</h3> or <h3>${
				amount[1].value + " " + amount[1].currencyCode
			}</h3></p>
			<br/><a href="${req.protocol}://192.168.1.102:3006/pay-bill/${bill._id}">Click here to pay</a>`,
		});

		return res.json({ status: true, message: "Bill create successfully", data: bill });
	} catch (e) {
		console.log(`Error in /bills/create, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
