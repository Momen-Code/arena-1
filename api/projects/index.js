const express = require("express");
const router = express.Router();
const { checkToken } = require("../../middlewares/jwt");

router.use("/create", checkToken, require("./create"));
router.use("/delete", checkToken, require("./delete"));
router.use("/edit", checkToken, require("./edit"));
router.use("/changeIndex", checkToken, require("./changeIndex"));
router.use("/get", require("./get"));

module.exports = router;
