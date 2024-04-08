const Product = require("../models/product");

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.title);
  product.saveProduct();
  res.redirect("/");
};

exports.formProduct = (req, res, next) => {
  res.render("add-product", {
    pageTitle: "Add Product",
    formCSS: true,
    productCSS: true,
    path: "/admin/add-product",
  });
};

exports.getProduct = (req, res, next) => {
  const prod = Product.fetchAll();
  res.render("shop", {
    pageTitle: "Shop",
    path: "/",
    formCSS: false,
    productCSS: true,
    hasProduct: false,
    hasProduct: prod?.length > 0,
    prods: prod,
  });
};
