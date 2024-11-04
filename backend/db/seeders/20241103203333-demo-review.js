"use strict";

const { Review } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Review.bulkCreate(
      [
        {
          spotId: 1,
          userId: 1,
          comment: 'This spot is awesome!',
          stars: 5,
          reviewImage: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjE4NTg5MzIzNjI0NjI2MA%3D%3D/original/ba2f3fdb-57c8-48c3-81bc-9f9b79a90b42.jpeg?im_w=2560&im_q=highq'
        },
        {
          spotId: 2,
          userId: 2,
          comment: "It was great, but need some improvment",
          stars: 4,
          reviewImage: "https://a0.muscache.com/im/pictures/4d94cc14-0879-4cbc-ade8-f170aa45fdc2.jpg?im_w=1200"
        },
        {
          spotId: 3,
          userId: 3,
          comment: "This spot is amazing",
          stars: 5,
          reviewImage: "https://a0.muscache.com/im/pictures/miso/Hosting-574398309589736679/original/c8cbf3a3-7d00-4ffc-bfc9-3c90c161e534.jpeg?im_w=1440"

        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
