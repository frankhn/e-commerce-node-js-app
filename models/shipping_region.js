'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shipping_region = sequelize.define('Shipping_region', {
    shipping_region_id: DataTypes.INTEGER,
    shipping_region: DataTypes.STRING
  }, {});
  Shipping_region.associate = function(models) {
    // associations can be defined here
  };
  return Shipping_region;
};