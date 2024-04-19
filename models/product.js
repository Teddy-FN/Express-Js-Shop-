const Sequalize = require("sequelize"),
  sequalize = require("../utils/database"),
  Product = sequalize.define("product", {
    id: {
      type: Sequalize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: Sequalize.STRING,
    price: {
      type: Sequalize.DOUBLE,
      allowNull: false,
    },
    imageUrl: {
      type: Sequalize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequalize.STRING,
      allowNull: false,
    },
  });

module.exports = Product;
