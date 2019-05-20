'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tax = sequelize.define('Tax', {
    tax_type: DataTypes.STRING,
    tax_percentage: DataTypes.DECIMAL
  }, {});
  Tax.associate = function(models) {
    // associations can be defined here
  };
  return Tax;
};