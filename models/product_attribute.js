/* eslint-disable camelcase */

const product_attributeModel = (sequelize, DataTypes) => {
  const Product_attribute = sequelize.define('product_attribute', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attribute_value_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  // eslint-disable-next-line no-unused-vars
  Product_attribute.associate = (models) => {
    // associations can be defined here
  };
  return Product_attribute;
};

export default product_attributeModel;
