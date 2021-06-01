const mongoose = require("mongoose");
const autoIncreament = require("mongoose-auto-increment");

//Init auto increament
autoIncreament.initialize(mongoose.connection);

const UserSchema = new mongoose.Schema({
	username: String,
	email: String,
	password: String,
	createDate: {
		type: Date,
		default: Date.now(),
	},
});

UserSchema.plugin(autoIncreament.plugin, { model: "User", startAt: 1 });

module.exports = mongoose.model("User", UserSchema, "users");
