const express = require("express");

const router = express.Router();
const controllerAdminData = require("../controller");

router.get("/", controllerAdminData?.getProduct);

module.exports = router;
