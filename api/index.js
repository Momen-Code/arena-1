const express = require("express");
const router = express.Router();

router.use("/projects", require("./projects"));
router.use("/services", require("./services"));

module.exports = router;
