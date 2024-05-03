const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const OrderItems = sequelize.define("orderItems", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = OrderItems;
