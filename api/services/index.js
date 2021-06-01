const express = require("express");
const router = express.Router();

router.use("/create", require("./create"));
router.use("/delete", require("./delete"));
// router.use("/edit", require("./edit"));
router.use("/get", require("./get"));

module.exports = router;
