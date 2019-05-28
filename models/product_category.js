/* eslint-disable camelcase */


const ProductCategoryModel = (sequelize, DataTypes) => {
  const Product_category = sequelize.define('product_category', {
    product_id: {
      type: DataTypes.INTEGER,
    },
    category_id: {
      type: DataTypes.INTEGER
    }
  }, {});
  // Product_category.associate = function (models) {
  //   // associations can be defined here
  // };
  return Product_category;
};

export default ProductCategoryModel;
