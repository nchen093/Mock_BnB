"use strict";

const { ReviewImage } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await ReviewImage.bulkCreate([
      {
        reviewId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-833588507621223725/original/3b4daa13-ec4e-4aa6-9a98-0956dfe7f285.jpeg",
      },
      {
        reviewId: 2,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-863612129491577223/original/30889ad7-76b5-4d94-bfba-8ec94c8e8a72.jpeg",
      },
      {
        reviewId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-574398309589736679/original/c8cbf3a3-7d00-4ffc-bfc9-3c90c161e534.jpeg",
      },
      {
        reviewId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1066671149345730403/original/7ddca217-baf1-498d-8ca6-5575fc75941f.jpeg",
      },
      {
        reviewId: 5,
        url: "https://a0.muscache.com/im/pictures/6e6838d2-f696-498a-89c9-354faf6130c1.jpg",
      },
      {
        reviewId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-34512345/original/192f0bb3-5db8-420b-8222-5f6bf815a667.jpeg",
      },
      {
        reviewId: 7,
        url: "https://a0.muscache.com/im/pictures/bbfc64fa-dd02-4902-93a0-deeed7dc008e.jpg",
      },
      {
        reviewId: 8,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-686402035876821572/original/a84a00c8-3b07-48b9-841b-9b0093e72bda.jpeg",
      },
      {
        reviewId: 9,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1005823459945172808/original/1041606e-2443-423b-8d9d-39fc42da19d5.jpeg",
      },
      {
        reviewId: 10,
        url: "https://a0.muscache.com/im/pictures/61906891/d37e5c05_original.jpg",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    await queryInterface.bulkDelete(
      options,
      {
        reviewId: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], // Add conditions
      },
      {}
    );
  },
};
