const Product = require("../models/product");

// Admin
exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    req.body.title,
    req.body.imageUrl,
    req.body.price,
    req.body.description
  );
  product.saveProduct();
  res.redirect("/");
};

exports.formProduct = (req, res, next) => {
  res.render("admin/add-product", {
    pageTitle: "Add Product",
    formCSS: true,
    productCSS: true,
    path: "/admin/add-product",
  });
};

// Edit
exports.editFormProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    formCSS: true,
    productCSS: true,
    path: "/edit/add-product",
  });
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((prod) => {
    res.render("admin/products", {
      pageTitle: "Admin Products",
      path: "/admin/products",
      formCSS: false,
      productCSS: true,
      hasProduct: false,
      hasProduct: prod?.length > 0,
      prods: prod,
    });
  });
};
