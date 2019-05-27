

const productModel = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING(1000),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    discounted_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValues: 0.00
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image_2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    thumbnail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    display: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValues: 0
    },
  }, {});
  // eslint-disable-next-line no-unused-vars
  Product.associate = (models) => {
    // associations can be defined here
  };
  return Product;
};

export default productModel;
