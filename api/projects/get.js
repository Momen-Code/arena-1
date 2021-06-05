const express = require("express");
const router = express.Router();
const ProjectModel = require("../../models/Project.model");

router.post("/", async (req, res) => {
	try {
		const { slug } = req.body;

		/******************************************/

		//Get from DB
		if (!slug) {
			const projectsSearch = await ProjectModel.find({});
			return res.json({ status: true, message: "Data retreived successfully", data: projectsSearch });
		} else {
			const projectSearch = await ProjectModel.findOne({ slug });
			if (!projectSearch) {
				return res.json({ status: false, message: "There is no project with this url" });
			}
			return res.json({ status: true, message: "Data retreived successfully", data: projectSearch });
		}

		/******************************************/
	} catch (e) {
		console.log(`Error in /projects/get, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
