const express = require("express");
const router = express.Router();
const ServiceModel = require("../../models/Service.model");

router.post("/", async (req, res) => {
	try {
		const { _id } = req.body;

		/******************************************/

		//Get from DB
		const servicesSearch = await ServiceModel.find({ ...(_id && { _id }) });

		return res.json({ status: true, message: "Data retreived successfully", data: servicesSearch });

		/******************************************/
	} catch (e) {
		console.log(`Error in /projects/delete, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
