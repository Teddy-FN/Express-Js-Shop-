const Product = require("../models/product");

// Home
exports.index = (req, res, index) => {
  Product.fetchAll((prod) => {
    res.render("shop/index", {
      pageTitle: "All Products",
      path: "/",
      prods: prod,
      formCSS: false,
      productCSS: true,
      hasProduct: prod.length > 0,
    });
  });
};

// Products
exports.getProduct = (req, res, next) => {
  Product.fetchAll((prod) => {
    res.render("shop/product-list", {
      pageTitle: "Shop",
      path: "/products",
      prods: prod,
      formCSS: false,
      productCSS: true,
      hasProduct: prod.length > 0,
    });
  });
};

// Products Details
exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.id;
  // const prodId = res.req.params.id;
  console.log(prodId);

  Product.findById(prodId, (prod) => {
    console.log("prod =>", prod);
    res.render("shop/product-detail", {
      pageTitle: "Product Detail",
      path: "/products",
      prods: prod,
      formCSS: false,
      productCSS: true,
    });
  });
};

// Cart
exports.getCartProduct = (req, res, next) => {
  res.render("shop/cart", {
    pageTitle: "Your Cart",
    path: "/cart",
    formCSS: false,
    productCSS: true,
    hasProduct: false,
    prods: [],
  });
};

// Orders
exports.getOrdersProduct = (req, res, next) => {
  res.render("shop/orders", {
    pageTitle: "Your Orders",
    path: "/orders",
    formCSS: false,
    productCSS: true,
    hasProduct: false,
    prods: [],
  });
};

// Checkout
exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
    formCSS: false,
    productCSS: true,
    hasProduct: false,
    hasProduct: false,
    prods: [],
  });
};
