const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middlewares/jwt");

router.use("/create", checkToken, require("./create"));
router.use("/myinvoice", require("./myinvoice"));
router.use("/pay", require("./pay"));

module.exports = router;
