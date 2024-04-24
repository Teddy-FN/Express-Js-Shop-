const Product = require("../models/product");

// Admin
exports.postAddProduct = (req, res, next) => {
  console.log("REQ =====>", req);

  req.user
    .createProduct({
      title: req.body.title,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      description: req.body.description,
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Add
exports.addFormProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    formCSS: true,
    productCSS: true,
    path: "/admin/add-product",
    editing: false,
  });
};

// Edit Form
exports.editFormProduct = (req, res, next) => {
  const editMode = req?.query?.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req?.params?.id;

  req.user
    .getProducts({
      where: {
        id: prodId,
      },
    })
    .then((prods) => {
      console.log("PRODS =>", prods);
      const prod = prods[0];
      if (!prod) {
        return res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        formCSS: true,
        productCSS: true,
        editing: true,
        path: "/edit/edit-product",
        prod: prod,
      });
    })
    .catch((err) => console.log(err));
};

// Post edit
exports.postEditProduct = (req, res, next) => {
  Product.findById(req.body.id)
    .then((prod) => {
      prod.title = req.body.title;
      prod.imageUrl = req.body.imageUrl;
      prod.price = req.body.price;
      prod.description = req.body.description;
      return prod.save();
    })
    .then((result) => {
      console.log("RESULT", result);
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

// Delete Product
exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  Product.findById(prodId)
    .then((prod) => {
      return prod.destroy();
    })
    .then(() => res.redirect("/admin/products"))
    .catch((err) => console.log(err));
};

// Delete Product Cart
exports.deleteProductCart = (req, res, next) => {
  const prodId = req.body.id;
  Product.deleteProduct(prodId);
  res.redirect("/admin/products");
};

// Get Product
exports.getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((product) => {
      res.render("admin/products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        formCSS: false,
        productCSS: true,
        hasProduct: false,
        hasProduct: product?.length > 0,
        prods: product,
      });
    })
    .catch((err) => console.log(err));
};
