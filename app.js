const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// Sequalize
const sequelize = require("./utils/database");

const app = express();

const controllerError = require("./controller/404");

// Routes
const adminData = require("./routes/admin");
const shop = require("./routes/shop");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use("/admin", adminData);
app.use(shop);

app.use(controllerError.errorPage);

sequelize
  .sync()
  .then((res) => {
    console.log(res);
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
