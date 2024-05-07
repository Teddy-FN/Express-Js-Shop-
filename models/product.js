// const Sequalize = require("sequelize"),
//   sequalize = require("../utils/database");

const { getDb } = require("../utils/database");

class Product {
  constructor(title, price, description, imageUrl) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then((result) => {
        console.log("RESULT =>", result);
      })
      .catch((err) => {
        console.log("ERR =>", err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((prod) => {
        console.log("PROD =>", prod);
        return prod;
      })
      .catch((err) => {
        console.log('ERR =>', err);
      });
  }
}

// const Product = sequalize.define("product", {
//   id: {
//     type: Sequalize.INTEGER,
//     autoIncrement: true,
//     allowNull: false,
//     primaryKey: true,
//   },
//   title: Sequalize.STRING,
//   price: {
//     type: Sequalize.DOUBLE,
//     allowNull: false,
//   },
//   imageUrl: {
//     type: Sequalize.STRING,
//     allowNull: false,
//   },
//   description: {
//     type: Sequalize.STRING,
//     allowNull: false,
//   },
// });

module.exports = Product;
