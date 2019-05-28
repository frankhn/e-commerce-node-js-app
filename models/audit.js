

const AuditModel = (sequelize, DataTypes) => {
  const Audit = sequelize.define('audit', {
    order_id: DataTypes.INTEGER,
    created: DataTypes.DATE,
    message: DataTypes.TEXT,
    code: DataTypes.INTEGER
  }, {});
  // Audit.associate = function (models) {
  //   // associations can be defined here
  // };
  return Audit;
};

export default AuditModel;
