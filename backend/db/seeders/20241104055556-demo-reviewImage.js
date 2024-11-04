"use strict";

const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          imageUrl: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTEyNjE4NTg5MzIzNjI0NjI2MA%3D%3D/original/ba2f3fdb-57c8-48c3-81bc-9f9b79a90b42.jpeg?im_w=2560&im_q=highq',
        },
        {
          reviewId: 2,
          imageUrl: "https://a0.muscache.com/im/pictures/4d94cc14-0879-4cbc-ade8-f170aa45fdc2.jpg?im_w=1200"
        },
        {
          reviewId: 3,
          imageUrl: "https://a0.muscache.com/im/pictures/miso/Hosting-574398309589736679/original/c8cbf3a3-7d00-4ffc-bfc9-3c90c161e534.jpeg?im_w=1440"
        },
      ]
    )
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('ReviewImages', null, {});
     
  }
};
