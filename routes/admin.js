const express = require("express");

const router = express.Router();

// Controller
const controllerAdminData = require("../controller");

router.post("/add-product", controllerAdminData.postAddProduct);

router.get("/add-product", controllerAdminData.formProduct);

module.exports = router;
