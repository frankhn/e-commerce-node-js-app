'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product_category = sequelize.define('Product_category', {
    product_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER
  }, {});
  Product_category.associate = function(models) {
    // associations can be defined here
  };
  return Product_category;
};