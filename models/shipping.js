'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shipping = sequelize.define('Shipping', {
    shipping_type: DataTypes.STRING,
    shipping_cost: DataTypes.DECIMAL,
    shipping_region_id: DataTypes.INTEGER
  }, {});
  Shipping.associate = function(models) {
    // associations can be defined here
  };
  return Shipping;
};