const express = require("express");
const router = express.Router();
const ServiceModel = require("../../models/Service.model");
const { isUrl } = require("../../helpers");

router.post("/", async (req, res) => {
	try {
		const { title, slug, type, cover, subservices, description } = req.body;

		/******************************************/

		//Validation
		if (!title) return res.json({ status: false, message: "You must add a title to the service" });
		if (!type) return res.json({ status: false, message: "You must choose the type of the service" });
		if (!slug) return res.json({ status: false, message: "You must specify the slug of the service" });
		if (!cover) return res.json({ status: false, message: "You must set a cover to the service" });
		if (!subservices)
			return res.json({ status: false, message: "You must add at least one sub-service to the service" });
		if (!description) return res.json({ status: false, message: "You must add a description to the service" });

		//Validate URLs
		if (!isUrl(cover)) return res.json({ status: false, message: "Cover must be a photo url" });

		/******************************************/

		//Save to DB
		const savedService = await ServiceModel.create({ title, type, slug, cover, subservices, description });

		return res.json({ status: true, message: "Service added successfully", data: savedService });

		/******************************************/
	} catch (e) {
		console.log(`Error in /services/create, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
