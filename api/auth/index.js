const express = require("express");
const router = express.Router();

router.use("/login", require("./login"));
router.use("/reset-password", require("./resetPassword"));


module.exports = router;