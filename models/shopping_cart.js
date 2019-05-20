'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shopping_cart = sequelize.define('Shopping_cart', {
    item_id: DataTypes.INTEGER,
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    attributes: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    buy_now: DataTypes.BOOLEAN,
    added_on: DataTypes.DATE
  }, {});
  Shopping_cart.associate = function(models) {
    // associations can be defined here
  };
  return Shopping_cart;
};