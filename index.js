require("dotenv/config");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const paypal = require("paypal-rest-sdk");
const PORT = process.env.PORT || 5002;
const { PAYPAL_CLIENTID, PAYPAL_SECRET, PAYPAL_SANDBOX_ACTIVE } = process.env;

//Init Paypal
paypal.configure({
	mode: PAYPAL_SANDBOX_ACTIVE ? "sandbox" : "live",
	client_id: PAYPAL_CLIENTID,
	client_secret: PAYPAL_SECRET,
});

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//DB
require("./db");

//API
app.use("/api", require("./api"));

//For the react app
if (process.env.NODE_ENV == "production") {
	app.use(express.static(path.join(__dirname, "client", "build")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "client", "build", "index.html"));
	});
}

/*********************************************************/

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
