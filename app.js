const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

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

app.use((req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "404 Error page",
    formCSS: false,
    productCSS: false,
    path: null,
  });
});

app.listen(5000);
