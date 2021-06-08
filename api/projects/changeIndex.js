const express = require("express");
const router = express.Router();
const ProjectModel = require("../../models/Project.model");

router.post("/", async (req, res) => {
	try {
		const { firstId, secondId } = req.body;

		let firstItemTempId = Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);
		// let secondItemTempId = Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);

		await ProjectModel.updateOne({ id: firstId }, { $set: { id: firstItemTempId } });
		await ProjectModel.updateOne({ id: secondId }, { $set: { id: firstId } });
		await ProjectModel.updateOne({ id: firstItemTempId }, { $set: { id: secondId } });

		return res.json({ status: true, message: "swapped index successfully" });
	} catch (e) {
		console.log(`Error in /projects/changeIndex, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
