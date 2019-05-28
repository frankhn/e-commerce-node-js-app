
const CategoryModel = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    department_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  // Category.associate = function (models) {
  //   // associations can be defined here
  // };
  return Category;
};

export default CategoryModel;
