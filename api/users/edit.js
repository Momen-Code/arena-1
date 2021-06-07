const express = require("express");
const router = express.Router();
const UserModel = require("../../models/User.model");

router.post("/", async (req, res) => {
	try {
		const { _id, username, email } = req.body;

		//Validation
		if (!username)
			return res.json({
				status: false,
				message: "You must write the username",
			});
		if (!email)
			return res.json({
				status: false,
				message: "You must write the email",
			});

		let userSearch = await UserModel.findOne({
			_id: { $ne: _id },
			$or: [{ email }, { username }],
		});

		if (userSearch) return res.json({ status: false, message: "This username or email already exists" });

		/********************************************************/

		//Update the user
		await UserModel.updateOne(
			{ _id },
			{
				username,
				email,
			}
		);

		//Get the user after update
		userSearch = await UserModel.findOne({ _id });

		return res.json({
			status: true,
			message: "User has been modified successfully",
			data: userSearch,
		});

		/********************************************************/
	} catch (e) {
		console.log(`Error in /users/edit, error: ${e.message}`, e);
		res.json({
			status: false,
			errors: [e.message],
		});
	}
});

module.exports = router;
