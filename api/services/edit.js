const express = require("express");
const router = express.Router();
const ServiceModel = require("../../models/Service.model");
const { isUrl } = require("../../helpers");

router.post("/", async (req, res) => {
	try {
		const { _id, en, ar, slug, cover } = req.body;

		/******************************************/

		const { title: titleEn, description: descriptionEn, subservices: subservicesEn } = en;
		const { title: titleAr, description: descriptionAr, subservices: subservicesAr } = ar;
		/******************************************/

		//Validation
		if (!_id) return res.json({ status: false, message: "Error occurred, please contact ARCHAOS Developement Team" });
		if (!titleEn || !titleAr) return res.json({ status: false, message: "You must add a title to the service" });
		if (!descriptionEn || !descriptionAr)
			return res.json({ status: false, message: "You must add a description to the service" });

		//Validate URLs
		if (!isUrl(cover)) return res.json({ status: false, message: "Cover must be a photo url" });

		/******************************************/

		//Update on DB
		await ServiceModel.updateOne({ _id }, { slug, cover, en, ar });
		const serviceSearch = await ServiceModel.findOne({ _id });

		return res.json({ status: true, message: "Service updated successfully", data: serviceSearch });

		/******************************************/
	} catch (e) {
		console.log(`Error in /services/edit, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
