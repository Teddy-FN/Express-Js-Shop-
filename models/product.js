const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "product.json"
);

const getProductFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) return cb([]);
    return cb(JSON.parse(fileContent));
  });
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
    getProductFromFile((product) => {
      if (this.id) {
        const existingFindIndex = product.findIndex(
          (prod) => prod.id === this.id
        );
        // console.log(existingFindIndex);
        const updatedProduct = [...product];
        updatedProduct[existingFindIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProduct), (err) => {
          console.log(err);
        });
      } else {
        this.id = Math.random().toString();
        product.push(this);
        fs.writeFile(p, JSON.stringify(product), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(cb) {
    getProductFromFile(cb);
  }

  // Get Details
  static findById(id, cb) {
    getProductFromFile((product) => {
      const prod = product.find((items) => items?.id === id);
      cb(prod);
    });
  }
};
