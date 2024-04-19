// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "teddyferdian98",
// });

// module.exports = pool.promise();

const Sequalize = require("sequelize");

const sequalize = new Sequalize("node-complete", "root", "teddyferdian98", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequalize;
