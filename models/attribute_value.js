/* eslint-disable camelcase */


const Attribute_valueModel = (sequelize, DataTypes) => {
  const Attribute_value = sequelize.define('attribute_value', {
    attribute_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  // eslint-disable-next-line no-unused-vars
  Attribute_value.associate = (models) => {
    // associations can be defined here
  };
  return Attribute_value;
};

export default Attribute_valueModel;
