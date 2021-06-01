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
				message: "يجب كتابة اسم المستخدم أو البريد الالكتروني",
			});

		let userSearch = await UserModel.findOne({
			$or: [{ email: user }, { username: user }],
		});

		if (!userSearch) return res.json({ status: false, message: "هذا المستخدم غير موجود" });

		/********************************************************/

		return res.json({
			status: true,
			message: "تم ارسال كلمة المرور الجديدة الي حسابك",
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
