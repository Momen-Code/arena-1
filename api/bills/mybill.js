const express = require("express");
const router = express.Router();
const ObjectId = require("mongoose").Types.ObjectId;
const BillModel = require("../../models/Bill.model");

router.post("/", async (req, res) => {
	try {
		const { _id } = req.body;

		if (!ObjectId.isValid(_id))
			return res.json({
				status: false,
				message:
					req.get("Accept-Language") == "ar"
						? "لكي تتمكن من دفع الفاتورة ، يجب عليك فتح الرابط الذي تم ارساله الي بريدك الالكتروني"
						: "To pay your bill, you must open the link sent to you via email",
			});

		const billSearch = await BillModel.findById(_id);

		if (!billSearch)
			return res.json({
				status: false,
				message:
					req.get("Accept-Language") == "ar"
						? "لكي تتمكن من دفع الفاتورة ، يجب عليك فتح الرابط الذي تم ارساله الي بريدك الالكتروني"
						: "To pay your bill, you must open the link sent to you via email",
			});

		return res.json({ status: true, message: "Data retreived successfully", data: billSearch });
	} catch (e) {
		console.log(`Error in /bills/mybill, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
