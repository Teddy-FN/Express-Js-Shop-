const Product = require("../models/product");
const Cart = require("../models/cart");

// Home
exports.index = (req, res, index) => {
  Product.fetchAll()
    .then(([rows, tableData]) => {
      res.render("shop/index", {
        pageTitle: "All Products",
        path: "/",
        prods: rows,
        formCSS: false,
        productCSS: true,
        hasProduct: rows.length > 0,
      });
    })
    .catch((err) => {
      return err;
    });
};

// Products
exports.getProduct = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, tableData]) => {
      res.render("shop/product-list", {
        pageTitle: "Shop",
        path: "/products",
        prods: rows,
        formCSS: false,
        productCSS: true,
        hasProduct: rows.length > 0,
      });
    })
    .catch((err) => {
      return err;
    });
};

// Products Details
exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.id;
  Product.findById(prodId)
    .then(([prods, table]) => {
      console.log('PROD =>', prods);
      res.render("shop/product-detail", {
        pageTitle: prods?.[0].title,
        path: "/products",
        prods: prods?.[0],
        formCSS: false,
        productCSS: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Cart
exports.getCartProduct = (req, res, next) => {
  Cart.getProduct((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (products of products) {
        const cartProductData = cart.products.find(
          (prods) => prods.id === products.id
        );
        if (cartProductData) {
          cartProducts.push({
            productData: products,
            qty: cartProductData.qty,
          });
        }
      }
      res.render("shop/cart", {
        pageTitle: "Your Cart",
        path: "/cart",
        formCSS: false,
        productCSS: true,
        hasProduct: false,
        prods: cartProducts,
      });
    });
  });
};

// Post Cart
exports.postCart = (req, res, next) => {
  const prodId = req.body.id;
  // Call Cart Models
  Product.findById(prodId, (prod) => {
    Cart.addProduct(prodId, prod.price);
  });
  res.redirect("/cart");
};

// Delete Product Cart
exports.postDeleteProductCart = (req, res, next) => {
  const prodId = req.body.id;
  console.log("PROD ID IKI BRAY", prodId);
  Product.findById(prodId, (prod) => {
    console.log("PROD =>", prod);
    Cart.deleteInCart(prodId, prod.price);
    res.redirect("/cart");
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
