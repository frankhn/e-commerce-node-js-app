/* eslint-disable camelcase */


const ShippingRegion = (sequelize, DataTypes) => {
  const Shipping_region = sequelize.define('Shipping_region', {
    shipping_region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    shipping_region: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});

  // eslint-disable-next-line no-unused-vars
  Shipping_region.associate = (models) => {
    // associations can be defined here
  };
  return Shipping_region;
};

export default ShippingRegion;
