const Sequelize = require("sequelize");
const sequelize = require("./../database");

const Repo = sequelize.define("repo", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
      type : Sequelize.STRING,
      allowNull : false
  },
  template: {
      type : Sequelize.STRING,
      allowNull : false
  },
  private: {
      type : Sequelize.BOOLEAN,
      allowNull : false
  }
});

module.exports = Repo;
