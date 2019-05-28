

const ReviewModel = (sequelize, DataTypes) => {
  const Review = sequelize.define('review', {
    customer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    rating: DataTypes.INTEGER,
  }, {});
  // Review.associate = function (models) {
  //   // associations can be defined here
  // };
  return Review;
};

export default ReviewModel;
