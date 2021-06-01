const express = require("express");
const router = express.Router();
const ProjectModel = require("../../models/Project.model");

router.post("/", async (req, res) => {
	try {
		const { _id } = req.body;

		/******************************************/

		//Validation
		if (!_id) return res.json({ status: false, message: "You must choose which project to delete" });

		/******************************************/

		//Delete from DB
		await ProjectModel.deleteOne({ _id });

		return res.json({ status: true, message: "Project deleted successfully" });

		/******************************************/
	} catch (e) {
		console.log(`Error in /projects/delete, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
