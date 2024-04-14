"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     
    */
    await queryInterface.bulkInsert(
      "User",
      [
        {
          email: "user1@example.com",
          password: "password1",
          username: "user1",
        },
        {
          email: "user2@example.com",
          password: "password2",
          username: "user2",
        },
        {
          email: "user3@example.com",
          password: "password3",
          username: "user3",
        },
        {
          email: "user4@example.com",
          password: "password4",
          username: "user4",
        },
        {
          email: "user5@example.com",
          password: "password5",
          username: "user5",
        },
        {
          email: "user6@example.com",
          password: "password6",
          username: "user6",
        },
        {
          email: "user7@example.com",
          password: "password7",
          username: "user7",
        },
        {
          email: "user8@example.com",
          password: "password8",
          username: "user8",
        },
        {
          email: "user9@example.com",
          password: "password9",
          username: "user9",
        },
        {
          email: "user10@example.com",
          password: "password10",
          username: "user10",
        },
        {
          email: "user11@example.com",
          password: "password11",
          username: "user11",
        },
        {
          email: "user12@example.com",
          password: "password12",
          username: "user12",
        },
        {
          email: "user13@example.com",
          password: "password13",
          username: "user13",
        },
        {
          email: "user14@example.com",
          password: "password14",
          username: "user14",
        },
        {
          email: "user15@example.com",
          password: "password15",
          username: "user15",
        },
        {
          email: "user16@example.com",
          password: "password16",
          username: "user16",
        },
        {
          email: "user17@example.com",
          password: "password17",
          username: "user17",
        },
        {
          email: "user18@example.com",
          password: "password18",
          username: "user18",
        },
        {
          email: "user19@example.com",
          password: "password19",
          username: "user19",
        },
        {
          email: "user20@example.com",
          password: "password20",
          username: "user20",
        },
        {
          email: "user21@example.com",
          password: "password21",
          username: "user21",
        },
        {
          email: "user22@example.com",
          password: "password22",
          username: "user22",
        },
        {
          email: "user23@example.com",
          password: "password23",
          username: "user23",
        },
        {
          email: "user24@example.com",
          password: "password24",
          username: "user24",
        },
        {
          email: "user25@example.com",
          password: "password25",
          username: "user25",
        },
        {
          email: "user26@example.com",
          password: "password26",
          username: "user26",
        },
        {
          email: "user27@example.com",
          password: "password27",
          username: "user27",
        },
        {
          email: "user28@example.com",
          password: "password28",
          username: "user28",
        },
        {
          email: "user29@example.com",
          password: "password29",
          username: "user29",
        },
        {
          email: "user30@example.com",
          password: "password30",
          username: "user30",
        },
        ``,
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
