const Sequelize = require("sequelize");
const dbName = "products";
const dbUser = "postgres";
const dbPassword = "root";

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: 'localhost',
  port: 5432,
  dialect: "postgres",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models table
db.items = require("./items.model")(sequelize, Sequelize);

module.exports = db;
