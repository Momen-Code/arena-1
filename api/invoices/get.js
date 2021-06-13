require("dotenv/config");
const express = require("express");
const router = express.Router();
const paypal = require("paypal-rest-sdk");

router.post("/", async (req, res) => {
	try {
		/******************************************/

		paypal.invoice.list({}, {}, (err, response) => {
			if (err) {
				return res.json({ status: false, message: "Error occurred, please contact Archaos' development team" });
			}

			return res.json({ status: true, message: "Data retreived successfully", data: response.invoices });
		});

		/******************************************/
	} catch (e) {
		console.log(`Error in /invoices/get, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
