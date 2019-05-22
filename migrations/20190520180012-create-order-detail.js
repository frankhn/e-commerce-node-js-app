

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Order_details', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    item_id: {
      type: Sequelize.INTEGER
    },
    order_id: {
      type: Sequelize.INTEGER
    },
    product_id: {
      type: Sequelize.INTEGER
    },
    attributes: {
      type: Sequelize.STRING
    },
    product_name: {
      type: Sequelize.STRING
    },
    quantity: {
      type: Sequelize.INTEGER
    },
    unit_cost: {
      type: Sequelize.DECIMAL
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => Promise.all([queryInterface.dropTable('order_details')])
};
