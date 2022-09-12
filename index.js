require("dotenv/config");
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const paypal = require("paypal-rest-sdk");
const PORT = process.env.PORT || 5002;
const functions = require("firebase-functions");
const admin = require("firebase-admin");

//Init firebase
admin.initializeApp();

//Init Paypal
paypal.configure({
  mode: process.env.PAYPAL_SANDBOX_ACTIVE || functions.config().paypal.is_sandbox_active ? "sandbox" : "live",
  client_id: process.env.PAYPAL_CLIENTID || functions.config().paypal.client_id,
  client_secret: process.env.PAYPAL_SECRET || functions.config().paypal.secret,
});

//Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//DB
require("./db");

//API
app.use("/api", require("./api"));

/*********************************************************/

if (process.env.NODE_ENV != "production" || process.env.IS_HEROKU)
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

module.exports.app = functions.https.onRequest(app);
