module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    by: DataTypes.STRING,
    descendants: DataTypes.INTEGER,
    id: DataTypes.INTEGER,
    kids: DataTypes.JSON,
    score: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    time: DataTypes.INTEGER,
    title: DataTypes.TEXT,
    type: DataTypes.STRING
  }, {
    timestamp: true
  });
  return Story
}