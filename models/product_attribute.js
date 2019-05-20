'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product_attribute = sequelize.define('Product_attribute', {
    product_id: DataTypes.INTEGER,
    attribute_value_id: DataTypes.INTEGER
  }, {});
  Product_attribute.associate = function(models) {
    // associations can be defined here
  };
  return Product_attribute;
};