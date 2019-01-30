module.exports = (sequelize, DataTypes) => {
  const Token = sequelize.define(
    'Token',
    {
      id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
      userId: {
        type: DataTypes.UUID
      },
      token: { type: DataTypes.STRING, unique: true },
      platform: DataTypes.STRING,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  Token.associate = models => {
    // associations can be defined here
    Token.belongsTo(models.User, { foreignKey: 'userId' });
  };
  return Token;
};
