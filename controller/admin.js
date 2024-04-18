const Product = require("../models/product");

// Admin
exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    null,
    req.body.title,
    req.body.imageUrl,
    req.body.price,
    req.body.description
  );
  product
    .saveProduct()
    .then((data) => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log('ERR =>', err);
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
  console.log("prodId =>", prodId);
  Product.findById(prodId, (prod) => {
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
  });
};

// Post edit
exports.postEditProduct = (req, res, next) => {
  const product = new Product(
    req.body.id,
    req.body.title,
    req.body.imageUrl,
    req.body.price,
    req.body.description
  );
  product.saveProduct();
  res.redirect("/admin/products");
};

// Delete Product
exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.id;
  console.log("PROD ID =>", prodId);
  Product.deleteProduct(prodId);
  res.redirect("/admin/products");
};

// Delete Product Cart
exports.deleteProductCart = (req, res, next) => {
  const prodId = req.body.id;
  Product.deleteProduct(prodId);
  res.redirect("/admin/products");
};

// Get Product
exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, tableData]) => {
      res.render("admin/products", {
        pageTitle: "Admin Products",
        path: "/admin/products",
        formCSS: false,
        productCSS: true,
        hasProduct: false,
        hasProduct: rows?.length > 0,
        prods: rows,
      });
    })
    .catch((err) => {
      return err;
    });
};
