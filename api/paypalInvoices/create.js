require("dotenv/config");
const express = require("express");
const router = express.Router();
const paypal = require("paypal-rest-sdk");
const functions = require("firebase-functions");
const { PAYPAL_EMAIL } = process.env;

router.post("/", async (req, res) => {
	try {
		/******************************************/
		const { clientEmail, firstName, lastName, description, amount } = req.body;
		//Validation
		if (!clientEmail) return res.json({ status: false, message: "You must write the client email" });
		if (!firstName) return res.json({ status: false, message: "You must write the first name of the client" });
		if (!lastName) return res.json({ status: false, message: "You must write the last name of the client" });
		if (!description) return res.json({ status: false, message: "You must write a description for the invoice" });
		if (!amount) return res.json({ status: false, message: "You must write the amount you need to collect" });

		/******************************************/
		paypal.invoice.create(
			{
				merchant_info: {
					email: PAYPAL_EMAIL || functions.config().paypal.url,
					business_name: "Arena Media",
					address: {
						line1: "32 Husayn Channam St, Al-Hamraa Dist",
						city: "Jeddah",
						state: "Jeddah",
						postal_code: "4995",
						country_code: "SA",
					},
				},
				billing_info: [
					{
						email: clientEmail,
						first_name: firstName,
						last_name: lastName,
					},
				],
				items: [
					{
						name: description,
						quantity: 1,
						unit_price: {
							currency: "USD",
							value: amount,
						},
					},
				],
			},
			{},
			(err, response) => {
				if (err) {
					return res.json({
						status: false,
						message: "Error occurred, please contact Archaos' development team",
						error: err,
					});
				}

				res.json({
					status: true,
					message: `Invoice #${response.number} was created successfully, to let the client know, you must send it first`,
					data: response,
				});
			}
		);

		/******************************************/
	} catch (e) {
		console.log(`Error in /invoices/get, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
