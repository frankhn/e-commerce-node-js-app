'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attribute_value = sequelize.define('Attribute_value', {
    attribute_id: DataTypes.INTEGER,
    value: DataTypes.STRING
  }, {});
  Attribute_value.associate = function(models) {
    // associations can be defined here
  };
  return Attribute_value;
};