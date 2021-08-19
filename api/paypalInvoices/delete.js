require("dotenv/config");
const express = require("express");
const router = express.Router();
const paypal = require("paypal-rest-sdk");

router.post("/", async (req, res) => {
	try {
		/******************************************/
    const { invoiceId } = req.body;
    console.log(req.body);
		//Validation
		if (!invoiceId) return res.json({ status: false, message: "You must select the invoice" });
		/******************************************/

		//Send to the client
		paypal.invoice.del(invoiceId, {}, (err, response) => {
			if (err) {
				return res.json({
					status: false,
					message: "Error occurred, please contact Archaos' development team",
					error: err,
				});
      }
			res.json({
				status: true,
				message: `The invoice was deleted successfully`,
			});
		});

		/******************************************/
	} catch (e) {
		console.log(`Error in /invoices/resend, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
