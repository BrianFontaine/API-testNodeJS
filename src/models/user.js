module.exports = (sequelize, DataTypes) => {
    return sequelize.define('User', {
      id: {
        AllowNull :false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        unique : true,
        AllowNull :false
      },
      password: {
        type: DataTypes.STRING,
        AllowNull :false
      }
    })
  }