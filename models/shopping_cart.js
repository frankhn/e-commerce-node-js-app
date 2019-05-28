/* eslint-disable camelcase */


const CartModel = (sequelize, DataTypes) => {
  const Shopping_cart = sequelize.define('shopping_cart', {
    item_id: {
      type: DataTypes.INTEGER,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    attributes: {
      type: DataTypes.STRING,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    buy_now: {
      type: DataTypes.BOOLEAN,
      defaultValues: true
    },
    added_on: {
      type: DataTypes.DATE,
      defaultValues: Date.now()
    }
  }, {});
  // Shopping_cart.associate = function (models) {
  //   // associations can be defined here
  // };
  return Shopping_cart;
};

export default CartModel;
