'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('eview', {
    customer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
    created_on: DataTypes.DATE
  }, {});
  Review.associate = function(models) {
    // associations can be defined here
  };
  return Review;
};