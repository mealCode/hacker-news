
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Stories', {
      uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      by: Sequelize.STRING,
      descendants: Sequelize.INTEGER,
      id: Sequelize.INTEGER,
      kids: Sequelize.JSON,
      score: Sequelize.INTEGER,
      text: Sequelize.TEXT,
      time: Sequelize.INTEGER,
      title: Sequelize.TEXT,
      type: Sequelize.STRING,
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Stories')
  }
};
