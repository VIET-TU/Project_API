"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Role", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      // email: DataTypes.STRING,
      // password: DataTypes.STRING,
      // username: DataTypes.STRING,
      // address: DataTypes.STRING,
      // sex: DataTypes.STRING,
      // phone: DataTypes.STRING,
      // groupId: DataTypes.INTEGER,
      email: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING,
      },
      sex: {
        type: Sequelize.STRING,
      },
      phone: {
        type: Sequelize.STRING,
      },
      groupId: {
        type: Sequelize.INTEGER,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Role");
  },
};
