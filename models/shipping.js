

const shippingModel = (sequelize, DataTypes) => {
  const Shipping = sequelize.define('shipping', {
    shipping_type: DataTypes.STRING,
    shipping_cost: DataTypes.DECIMAL,
    shipping_region_id: DataTypes.INTEGER
  }, {});
  // Shipping.associate = function (models) {
  //   // associations can be defined here
  // };
  return Shipping;
};

export default shippingModel;
