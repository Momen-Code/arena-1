const express = require("express");
const router = express.Router();
const Slug = require("slug");
const ProjectModel = require("../../models/Project.model");
const ServiceModel = require("../../models/Service.model");
const { isUrl } = require("../../helpers");

router.post("/", async (req, res) => {
	try {
		const { _id, ar, en, type, slides, thumbnail } = req.body;
		/******************************************/

		const { title: titleEn, description: descriptionEn } = en;
		const { title: titleAr, description: descriptionAr } = ar;
		/******************************************/

		//Validation
		if (!_id) return res.json({ status: false, message: "Error occurred, please contact ARCHAOS Developement Team" });
		if (!type) return res.json({ status: false, message: "You must select the type" });
		if (!titleEn || !titleAr) return res.json({ status: false, message: "You must add a title to the service" });
		if (!thumbnail) return res.json({ status: false, message: "You must set a thumbnail to the service" });
		if (!descriptionEn || !descriptionAr)
			return res.json({ status: false, message: "You must add a description to the service" });

		//Validate URLs
		if (!isUrl(thumbnail)) return res.json({ status: false, message: "Thumbnail must be a photo url" });

		//Create the slug
		const slug = Slug(titleEn);
		for (let slide of slides) {
			if (!isUrl(slide)) return res.json({ status: false, message: "Every slide must be a photo url" });
		}

		//Enum of type
		const servicesSearch = await ServiceModel.find({});
		if (!servicesSearch.map((service) => service.en.title).includes(type))
			return res.json({ status: false, message: "The project type must be of any service" });

		/******************************************/

		//Save to DB
		await ProjectModel.updateOne(
			{ _id },
			{
				slug,
				type,
				thumbnail,
				slides,
				ar: { title: titleAr, description: descriptionAr },
				en: { title: titleEn, description: descriptionEn },
			}
		);

		//Get the updated project
		const savedProject = await ProjectModel.findOne({ _id });

		return res.json({ status: true, message: "Project updated successfully", data: savedProject });

		/******************************************/
	} catch (e) {
		console.log(`Error in /projects/edit, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
