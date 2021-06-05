const express = require("express");
const router = express.Router();
const Slug = require("slug");
const ServiceModel = require("../../models/Service.model");
const { isUrl } = require("../../helpers");

router.post("/", async (req, res) => {
	try {
		const { ar, en, parentId } = req.body;

		console.log(req.body);
		const { title: titleEn, cover: coverEn, description: descriptionEn } = en;
		const { title: titleAr, cover: coverAr, description: descriptionAr } = ar;
		/******************************************/

		//Validation
		if (!titleEn || !titleAr) return res.json({ status: false, message: "You must add a title to the service" });
		if (!coverEn || !coverAr) return res.json({ status: false, message: "You must set a cover to the service" });
		if (!descriptionEn || !descriptionAr)
			return res.json({ status: false, message: "You must add a description to the service" });

		//Validate URLs
		if (!isUrl(coverEn) || !isUrl(coverAr)) return res.json({ status: false, message: "Cover must be a photo url" });

		//Create the slug
		const slug = Slug(titleEn);
		/******************************************/

		//Save to DB
		let savedService;
		if (parentId) {
			await ServiceModel.updateOne(
				{ _id: parentId },
				{
					$push: {
						"ar.subservices": { title: titleAr, cover: coverAr, description: descriptionAr },
						"en.subservices": { title: titleAr, cover: coverAr, description: descriptionAr },
					},
				}
			);

			savedService = await ServiceModel.findOne({ _id: parentId });
		} else {
			savedService = await ServiceModel.create({
				ar: { title: titleAr, cover: coverAr, description: descriptionAr },
				en: { title: titleEn, cover: coverEn, description: descriptionEn },
				slug,
			});
		}

		return res.json({ status: true, message: "Service added successfully", data: savedService });

		/******************************************/
	} catch (e) {
		console.log(`Error in /services/create, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: `Error occured: ${e.message}` });
	}
});

module.exports = router;
