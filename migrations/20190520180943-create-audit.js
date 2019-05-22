

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('audits', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    order_id: {
      type: Sequelize.INTEGER
    },
    created: {
      type: Sequelize.DATE
    },
    message: {
      type: Sequelize.TEXT
    },
    code: {
      type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => Promise.all([queryInterface.dropTable('audits')])

};
