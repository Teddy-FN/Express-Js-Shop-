const express = require("express");

const router = express.Router();

// Controller
const controllerAdminData = require("../controller/admin");

// Add product
router.post("/add-product", controllerAdminData?.postAddProduct);

// Add product
router.get("/add-product", controllerAdminData?.addFormProduct);

// Edit Products Form
router.get("/edit-product/:id", controllerAdminData?.editFormProduct);

// Update Edit
router.post("/edit-product", controllerAdminData.postEditProduct);

// Get Admins Products
router.get("/products", controllerAdminData?.getProducts);

module.exports = router;
