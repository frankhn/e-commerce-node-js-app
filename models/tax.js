const taxModel = (sequelize, DataTypes) => {
  const Tax = sequelize.define('tax', {
    tax_type: {
      type: DataTypes.STRING,
    },
    tax_percentage: {
      type: DataTypes.DECIMAL
    }
  }, {});
  // Tax.associate = function (models) {
  //   // associations can be defined here
  // };
  return Tax;
};

export default taxModel;
