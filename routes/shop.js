const express = require("express");

const router = express.Router();
const shopController = require("../controller/shop");

// Home
router.get("/", shopController.index);

// Products
router.get("/products", shopController.getProduct);

// Products Details
router.get("/products/:id", shopController.getProductDetails);

// Cart
router.get("/cart", shopController.getCartProduct);
router.post("/cart", shopController.postCart);

// Delete Cart
router.post("/cart-delete-item", shopController.postDeleteProductCart);

// Checkout
router.get("/checkout", shopController.getCheckout);

// Orders
router.get("/orders", shopController.getOrdersProduct);

// Order Now
router.post("/create-order", shopController.postOrderNow);

module.exports = router;
