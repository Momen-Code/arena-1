const express = require("express");
const router = express.Router();
const ProjectModel = require("../../models/Project.model");

router.post("/", async (req, res) => {
	try {
		const { _id } = req.body;

		/******************************************/

		//Get from DB
		const projectsSearch = await ProjectModel.find({ ...(_id && { _id }) });

		return res.json({ status: true, message: "Data retreived successfully", data: projectsSearch });

		/******************************************/
	} catch (e) {
		console.log(`Error in /projects/delete, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
