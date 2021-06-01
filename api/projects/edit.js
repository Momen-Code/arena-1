const express = require("express");
const router = express.Router();
const ProjectModel = require("../../models/Project.model");
const ServiceModel = require("../../models/Service.model");
const { isUrl } = require("../../helpers");

router.post("/", async (req, res) => {
	try {
		const { _id, title, slug, type, thumbnail, slides, description } = req.body;

		/******************************************/

		//Validation
		if (!_id) return res.json({ status: false, message: "You must select which project you need to edit" });
		if (!title) return res.json({ status: false, message: "You must add a title to the project" });
		if (!type) return res.json({ status: false, message: "You must choose the type of the project" });
		if (!slug) return res.json({ status: false, message: "You must specify the slug of the project" });
		if (!thumbnail) return res.json({ status: false, message: "You must set a thumbnail to the project" });
		if (!slides) return res.json({ status: false, message: "You must add at least one image to the project" });
		if (!description) return res.json({ status: false, message: "You must add a description to the project" });

		//Validate URLs
		if (!isUrl(thumbnail)) return res.json({ status: false, message: "Thumbnail must be a photo url" });

		for (let slide of slides) {
			if (!isUrl(slide)) return res.json({ status: false, message: "Every slide must be a photo url" });
		}

		//Enum of type
		const servicesSearch = await ServiceModel.find({});
		if (!servicesSearch.map((service) => service.title).includes(type))
			return res.json({ status: false, message: "The project type must be of any service" });

		/******************************************/

		//Update on DB
		await ProjectModel.updateOne({ _id }, { title, type, slug, thumbnail, slides, description });

		//Get the project after edit
		const projectSearch = await ProjectModel.findOne({ _id });

		return res.json({ status: true, message: "Project updated successfully", data: projectSearch });

		/******************************************/
	} catch (e) {
		console.log(`Error in /projects/edit, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
