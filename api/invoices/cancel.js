require("dotenv/config");
const express = require("express");
const router = express.Router();
const paypal = require("paypal-rest-sdk");

router.post("/", async (req, res) => {
	try {
		/******************************************/
		const { invoiceId } = req.body;
		//Validation
		if (!invoiceId) return res.json({ status: false, message: "You must select the invoice" });
		/******************************************/

		//Send to the client
		paypal.invoice.cancel(invoiceId, { send_to_payer: true, send_to_merchant: true }, (err, response) => {
			if (err) {
				return res.json({
					status: false,
					message: "Error occurred, please contact Archaos' development team",
					error: err,
				});
			}
			console.log(response);
			res.json({
				status: true,
				message: `Invoice has been canceled successfully`,
			});
		});

		/******************************************/
	} catch (e) {
		console.log(`Error in /invoices/remind, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
