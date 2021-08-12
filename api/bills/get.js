const express = require("express");
const router = express.Router();
const BillModel = require("../../models/Bill.model");

router.post("/", async (req, res) => {
	try {
		const bills = await BillModel.find({});

		return res.json({ status: true, message: "Data retreived successfully", data: bills });
	} catch (e) {
		console.log(`Error in /bills/get, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
