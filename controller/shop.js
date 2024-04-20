const Product = require("../models/product");
const Cart = require("../models/cart");

// Home
exports.index = (req, res, index) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        pageTitle: "All Products",
        path: "/",
        prods: products,
        formCSS: false,
        productCSS: true,
        hasProduct: products.length > 0,
      });
    })
    .catch((err) => console.log(err));
};

// Products
exports.getProduct = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        pageTitle: "Shop",
        path: "/products",
        prods: products,
        formCSS: false,
        productCSS: true,
        hasProduct: products.length > 0,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// Products Details
exports.getProductDetails = (req, res, next) => {
  const prodId = req.params.id;
  Product.findAll({ where: { id: prodId } })
    .then((prods) => {
      res.render("shop/product-detail", {
        path: "/products",
        prods: prods?.[0],
        pageTitle: "Detail Product",
        formCSS: false,
        productCSS: true,
      });
    })
    .catch((err) => console.log("ERR =>", err));
};

// Cart
exports.getCartProduct = (req, res, next) => {
  Cart.getProduct((cart) => {
    Product.findAll((products) => {
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
  Product.findByPk(prodId, (prod) => {
    Cart.addProduct(prodId, prod.price);
  });
  res.redirect("/cart");
};

// Delete Product Cart
exports.postDeleteProductCart = (req, res, next) => {
  const prodId = req.body.id;
  Product.findByPk(prodId, (prod) => {
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
