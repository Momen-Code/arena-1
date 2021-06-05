const express = require("express");
const router = express.Router();
const UserModel = require("../../models/User.model");

router.post("/", async (req, res) => {
	try {
		const { user } = req.body;

		//Validation
		if (!user)
			return res.json({
				status: false,
				message: "You must type username or email",
			});

		let userSearch = await UserModel.findOne({
			$or: [{ email: user }, { username: user }],
		});

		if (!userSearch) return res.json({ status: false, message: "This user doesn't exist" });

		/********************************************************/

		return res.json({
			status: true,
			message: "A new password was sent to your email",
		});

		/********************************************************/
	} catch (e) {
		console.log(`Error in /auth/reset-password, error: ${e.message}`, e);
		res.json({
			status: false,
			message: e.message,
		});
	}
});

module.exports = router;
