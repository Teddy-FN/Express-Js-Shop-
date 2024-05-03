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
  console.log("REQ =>", req.user.cart);
  req.user
    .getCart()
    .then((data) => {
      return data
        .getProducts()
        .then((result) => {
          res.render("shop/cart", {
            pageTitle: "Your Cart",
            path: "/cart",
            formCSS: false,
            productCSS: true,
            hasProduct: false,
            prods: result,
          });
        })
        .catch((err) => {
          console.log("Err =>", err);
        });
    })
    .catch((err) => {
      console.log("Err =>", err);
    });
};

// Post Cart
exports.postCart = (req, res, next) => {
  const prodId = req.body.id;
  let fetchedCart;
  let newQuantity = 1;

  req.user
    .getCart()
    .then((prod) => {
      fetchedCart = prod;
      return prod.getProducts({ where: { id: prodId } });
    })
    .then((products) => {
      let product;

      if (products.length > 0) {
        product = products[0];
      }

      console.log("product =>", product);

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      return Product.findAll({ where: { id: prodId } });
    })
    .then((prods) => {
      fetchedCart.addProduct(prods, {
        through: {
          quantity: newQuantity,
        },
      });
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

// Delete Product Cart
exports.postDeleteProductCart = (req, res, next) => {
  const prodId = req.body.id;
  req.user
    .getCart()
    .then((prod) => {
      return prod.getProducts({
        where: {
          id: prodId,
        },
      });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect("/cart");
    })
    .catch((err) => console.log(err));
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
