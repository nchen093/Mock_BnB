"use strict";

const { SpotImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-833588507621223725/original/ade526d5-b237-4444-9810-42b1e177bc55.jpeg",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-863612129491577223/original/c42ae597-4911-4992-90a1-7e2659ff02ac.jpeg",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1203970905754828183/original/e566bc5d-ce01-4738-8c88-d29e553ccac1.jpeg",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1066671149345730403/original/a6794fec-63a6-4017-9ef8-31cf0d447982.jpeg",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/3b2bd014-6f59-4b14-bbba-e06acab2f67e.jpg",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-34512345/original/e1877938-06f0-452f-bab7-58f760e14495.jpeg",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/cd6274d1-9cae-43db-bee1-54e9dade89a6.jpg",
        preview: true,
      },
      {
        spotId: 8,
        url: "hhttps://a0.muscache.com/im/pictures/3512590a-01b4-4795-9d6b-70f35b44cdb1.jpg",
        preview: true,
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1005823459945172808/original/1b4536b1-673c-43e9-b92d-9166740bf90a.jpeg",
        preview: true,
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/44745891/6aa7a69b_original.jpg",
        preview: true,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "SpotImages";
    await queryInterface.bulkDelete(options, {
      spotId: [1, 2, 3], // Add conditions here if needed
    });
  },
};
