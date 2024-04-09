const express = require("express");

const router = express.Router();

// Controller
const controllerAdminData = require("../controller/admin");

// Add product
router.post("/add-product", controllerAdminData.postAddProduct);

// Add product
router.get("/add-product", controllerAdminData.formProduct);

// Edit Products
router.get("/edit-product", controllerAdminData.editFormProduct);

// Get Admins Products
router.get("/products", controllerAdminData.getProducts);

module.exports = router;
