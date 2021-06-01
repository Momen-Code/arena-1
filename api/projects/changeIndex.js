const express = require("express");
const router = express.Router();
const ProjectModel = require("../../models/Project.model");

router.post("/", async (req, res) => {
	try {
		const { firstId, secondId } = req.body;

		//Set the first item to a temporary random number over 1000000
		let firstItemTempId = Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);

		await ProjectModel.updateOne({ _id: firstId }, { _id: firstItemTempId });

		await ProjectModel.updateOne({ _id: secondId }, { _id: firstId });

		await ProjectModel.updateOne({ _id: firstItemTempId }, { _id: secondId });

		return res.json({ status: true, message: "swapped index successfully" });
	} catch (e) {
		console.log(`Error in /projects/changeIndex, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
