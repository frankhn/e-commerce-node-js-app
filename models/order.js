'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    total_amount: DataTypes.DECIMAL,
    created_on: DataTypes.DATE,
    shipped_on: DataTypes.DATE,
    status: DataTypes.INTEGER,
    comments: DataTypes.STRING,
    customer_id: DataTypes.INTEGER,
    auth_code: DataTypes.STRING,
    reference: DataTypes.STRING,
    shipping_id: DataTypes.INTEGER,
    tax_id: DataTypes.INTEGER
  }, {});
  Order.associate = function(models) {
    // associations can be defined here
  };
  return Order;
};