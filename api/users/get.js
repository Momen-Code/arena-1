const express = require("express");
const router = express.Router();
const UserModel = require("../../models/User.model");

router.post("/", async (req, res) => {
	try {
		if (req.user.role != "administrator")
			return res.json({ status: false, message: "You don't have access to this data" });

		let usersSearch = await UserModel.find({});

		if (usersSearch.length === 0) {
			return res.json({
				status: false,
				message: "No users are registered",
			});
		}

		return res.json({
			status: true,
			message: "Data retreived successfully",
			data: usersSearch,
		});

		/********************************************************/
	} catch (e) {
		console.log(`Error in /users/get, error: ${e.message}`, e);
		res.json({
			status: false,
			errors: [e.message],
		});
	}
});

module.exports = router;
