module.exports = (sequelize, Sequelize) => {
  return sequelize.define("bakery_item", {
    uuid: {
      type: Sequelize.UUID,
      primaryKey: true
    },
    itemName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    itemPrice: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    }
  });
};
