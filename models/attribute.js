

const AttributeModel = (sequelize, DataTypes) => {
  const Attribute = sequelize.define('attribute', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  // eslint-disable-next-line no-unused-vars
  Attribute.associate = (models) => {
    // associations can be defined here
  };
  return Attribute;
};

export default AttributeModel;
