

const DepartmentModel = (sequelize, DataTypes) => {
  const Department = sequelize.define('department', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  // Department.associate = function (models) {
  //   // associations can be defined here
  // };
  return Department;
};

export default DepartmentModel;
