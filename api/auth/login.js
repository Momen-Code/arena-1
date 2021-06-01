const express = require("express");
const router = express.Router();
const { createToken } = require("../../middlewares/jwt");
const bcrypt = require("bcrypt");
const UserModel = require("../../models/User.model");

router.post("/", async (req, res) => {
	try {
		const { user, password } = req.body;

		//Validation
		if (!user) return res.json({ status: false, message: "You must type username or email" });
		if (!password) return res.json({ status: false, message: "You must write the password" });

		//DB Check
		let userSearch = await UserModel.findOne({
			$or: [{ email: user }, { username: user }],
		});
		userSearch = userSearch && userSearch.toObject();

		if (!userSearch)
			return res.json({
				status: false,
				message: "Username or password are incorrect",
			});

		//Password Match
		if (!(await bcrypt.compare(password, userSearch.password)))
			return res.json({ status: false, message: "The password is incorrect" });

		//delete the password from user object
		delete userSearch.password;

		/********************************************************/

		//Send the jwt token with the success response
		const accessToken = await createToken({ _id: userSearch._id });

		res.cookie("access_token", accessToken, { maxAge: 86400 * 1000 });
		res.cookie("user_data", JSON.stringify(userSearch), {
			maxAge: 86400 * 1000,
		});
		return res.json({
			status: true,
			message: "You have logged in successfully",
			user: userSearch,
			accessToken,
		});

		/********************************************************/
	} catch (e) {
		console.log(`Error in /users/login, error: ${e.message}`, e);
		res.json({
			status: false,
			message: e.message,
		});
	}
});

module.exports = router;
