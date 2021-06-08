const express = require("express");
const router = express.Router();
const UserModel = require("../../models/User.model");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		if (req.user.role != "administrator")
			return res.json({ status: false, message: "You don't have access to this data" });

		const { username, email, password, passwordConfirm, role } = req.body;

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
		if (!password || !passwordConfirm)
			return res.json({
				status: false,
				message: "You must write password & password confirmation",
			});
		if (password.length < 5)
			return res.json({
				status: false,
				message: "Password shouldn't be less than 6 characters",
			});
		if (password != passwordConfirm)
			return res.json({
				status: false,
				message: "Password & password confirmation must be identical",
			});
		if (!["administrator", "user"].includes(role))
			return res.json({ status: false, message: "You must select the role of the user" });

		let userSearch = await UserModel.findOne({
			$or: [{ email }, { username }],
		});

		if (userSearch) return res.json({ status: false, message: "This user already exists" });

		/********************************************************/

		//Encrypt password
		const hashedPassword = await bcrypt.hash(password, 10);

		//Save the user to DB
		const saveUser = await UserModel.create({
			username,
			email,
			password: hashedPassword,
			role,
		});

		//Delete unwanted data
		delete saveUser.password;

		return res.json({
			status: true,
			message: "New user added successfully",
			data: saveUser,
		});

		/********************************************************/
	} catch (e) {
		console.log(`Error in /users/add, error: ${e.message}`, e);
		res.json({
			status: false,
			message: e.message,
		});
	}
});

module.exports = router;
