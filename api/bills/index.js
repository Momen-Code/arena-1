const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middlewares/jwt");

router.use("/create", checkToken, require("./create"));
router.use("/get", checkToken, require("./get"));
router.use("/mybill", require("./mybill"));

module.exports = router;
