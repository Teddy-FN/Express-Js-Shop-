const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Sequalize
const sequelize = require("./utils/database");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-items");

const app = express();

const controllerError = require("./controller/404");

// Routes
const adminData = require("./routes/admin");
const shop = require("./routes/shop");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findById(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

// Routes
app.use("/admin", adminData);
app.use(shop);

app.use(controllerError.errorPage);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// Add Association Product

sequelize
  .sync({
    force: true,
  })
  .then(() => {
    return User.findById(1);
  })
  .then((user) => {
    if (!user)
      return User.create({
        name: "Teddy",
        email: "Teddy@test.com",
      });

    return user;
  })
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
