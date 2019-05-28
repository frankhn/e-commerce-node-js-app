

const orderModel = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    total_amount: {
      type: DataTypes.DECIMAL
    },
    created_on: {
      type: DataTypes.DATE,
      defaultValues: Date.now()
    },
    shipped_on: {
      type: DataTypes.DATE,
      defaultValues: Date.now()
    },
    status: {
      type: DataTypes.INTEGER,
      defaultValues: 1
    },
    comments: {
      type: DataTypes.STRING
    },
    customer_id: {
      type: DataTypes.INTEGER
    },
    auth_code: {
      type: DataTypes.STRING,

    },
    reference: {
      type: DataTypes.STRING
    },
    shipping_id: {
      type: DataTypes.INTEGER,
      defaultValues: Date.now()
    },
    tax_id: {
      type: DataTypes.INTEGER
    }
  }, {});
  // Order.associate = function (models) {
  //   // associations can be defined here
  // };
  return Order;
};

export default orderModel;
