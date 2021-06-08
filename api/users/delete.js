const express = require("express");
const router = express.Router();
const UserModel = require("../../models/User.model");

router.post("/", async (req, res) => {
	try {
		if (req.user.role != "administrator")
			return res.json({ status: false, message: "You don't have access to this data" });

		const { _id } = req.body;

		/******************************************/

		//Validation
		if (!_id) return res.json({ status: false, message: "You must choose which user to delete" });

		/******************************************/

		//Delete from DB
		await UserModel.deleteOne({ _id });

		return res.json({ status: true, message: "User deleted successfully" });

		/******************************************/
	} catch (e) {
		console.log(`Error in /users/delete, ${e.message}`, e);
		if (!res.headersSent) return res.json({ status: false, message: "Error occured" });
	}
});

module.exports = router;
