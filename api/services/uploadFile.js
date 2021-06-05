const express = require("express");
const router = express.Router();
const Slug = require("slug");
const ServiceModel = require("../../models/Service.model");
const { isUrl } = require("../../helpers");

router.post("/", async (req, res) => {
	try {
		const savedService = await ServiceModel.insertMany([...req.body]);

		return res.json({ status: true, message: "Service added successfully", data: savedService });

		/******************************************/
	} catch (e) {
		console.log(`Error in /services/create, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: `Error occured: ${e.message}` });
	}
});

module.exports = router;
