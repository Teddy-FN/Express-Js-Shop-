// const fs = require("fs");
// const path = require("path");

// Using DB
const db = require("../utils/database");

// Import Models Cart
const Cart = require("./cart");

// const p = path.join(
//   path.dirname(process.mainModule.filename),
//   "data",
//   "product.json"
// );

const getProductFromFile = (cb) => {
  db.execute("SELECT * FROM products")
    .then(([prod, table]) => {
      cb([...prod]);
    })
    .catch((err) => {
      cb([]);
    });

  // fs.readFile(p, (err, fileContent) => {
  //   if (err) return cb([]);
  //   return cb(JSON.parse(fileContent));
  // });
};

module.exports = class Product {
  constructor(id, title, imageUrl, price, description) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.price = price;
    this.description = description;
  }

  saveProduct() {
    // getProductFromFile((product) => {
    //   if (this.id) {
    //     const existingFindIndex = product.findIndex(
    //       (prod) => prod.id === this.id
    //     );
    //     // console.log(existingFindIndex);
    //     const updatedProduct = [...product];
    //     updatedProduct[existingFindIndex] = this;
    //     fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
    //       console.log(err);
    //     });
    //   } else {
    //     this.id = Math.random().toString();
    //     product.push(this);
    //     fs.writeFile(p, JSON.stringify(product), (err) => {
    //       console.log(err);
    //     });
    //   }
    // });

    return db.execute(
      "INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)",
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  // Delete Product
  static deleteProduct(id) {
    // getProductFromFile((product) => {
    //   const prod = product.find((p) => p.id === id);
    //   const updateProduct = product.filter((items) => items.id !== id);
    //   fs.writeFile(p, JSON.stringify(updateProduct), (err) => {
    //     if (!err) {
    //       Cart.deleteInCart(id, prod.price);
    //     }
    //     console.log(err);
    //   });
    // });
  }

  static fetchAll() {
    // getProductFromFile(cb);
    return db.execute("SELECT * FROM products");
  }

  // Get Details
  static findById(id, cb) {
    // getProductFromFile((product) => {
    //   const prod = product.find((items) => items?.id === id);
    //   cb(prod);
    // });

    return db.execute("SELECT * FROM products WHERE products.id = ?", [id]);
  }
};
