const prod = [];

exports.postAddProduct = (req, res, next) => {
  prod.push({ title: req.body.title });
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
  res.render("shop", {
    pageTitle: "Shop",
    path: "/",
    formCSS: false,
    productCSS: true,
    hasProduct: false,
    hasProduct: prod.length > 0,
    prods: prod,
  });
};
