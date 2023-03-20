module.exports = (sequelize, Sequelize) => {
  const items = sequelize.define("items", {
    name: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    status: {
      type: Sequelize.STRING,
    },
    price: {
      type: Sequelize.INTEGER,
    },
  });
  return items;
};
