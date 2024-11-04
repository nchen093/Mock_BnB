"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Spot.bulkCreate([
      {
        ownerId: 1,
        address: "Princess Pond Road",
        city: "Summerton",
        state: "South Carolina",
        country: "United States of America",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "Home Sweet Home",
        description:
          "Welcome to the White House! Experience peace and tranquillity like never before in this exquisite home nestled along the shores of Lake Marion. Boasting 4 spacious bedrooms and 3.5 bathrooms, the whole family can enjoy ample space and luxury. Featuring an incredible private infinity pool, swim spa, chefs kitchen, private dock, gas grill, HDTV's in almost every room, and a master suite that is second to none. Hosted by Lake Marion Luxury Vacations and Concierge.",
        price: 411,
        avgRating: 4.97,
        previewImage:
          "https://a0.muscache.com/im/pictures/miso/Hosting-833588507621223725/original/ade526d5-b237-4444-9810-42b1e177bc55.jpeg?im_w=720",
      },

      {
        ownerId: 2,
        address: "Hill View Lodge",
        city: "Lincolnshire",
        state: "Lincoln",
        country: "United Kingdom",
        lat: 53.1956334,
        lng: -0.5615123,
        name: "Entire cabin",
        description:
          "A stylish 1 x bedroom log cabin perfect for a couple. Set in a peaceful, rural location on the edge of the Lincolnshire Wolds. Open views to the east coast some 10 miles away. The historic town of Louth with it's many cafes, restaurants & independent shops is only 5 minutes away. Coastal towns of Skegness, Mablethorpe & Cleethorpes, Market town of Horncastle, Dambusters famous Woodall Spa & Lincoln Cathedral are within local area.",
        price: 119,
        avgRating: 4.97,
        previewImage:
          "https://a0.muscache.com/im/pictures/miso/Hosting-863612129491577223/original/c42ae597-4911-4992-90a1-7e2659ff02ac.jpeg?im_w=720",
      },

      {
        ownerId: 3,
        address: "54234 Disney Land",
        city: "La Fortuna",
        state: "Alajuela",
        country: "Costa Rica",
        lat: 10.5085456,
        lng: -84.6459234,
        name: "Entire villa",
        description:
          "Ideal villa for resting , surrounded by nature. A magnificent space to celebrate honeymoons, anniversaries or birthdays, or just to disconnect from stress. With a relaxing jacuzzi, hydro massage and hot water, you can enjoy on your totally private terrace, overlooking the garden.",
        price: 160,
        avgRating: 4.94,
        previewImage:
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1203970905754828183/original/e566bc5d-ce01-4738-8c88-d29e553ccac1.jpeg?im_w=1200",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Spots";
    // const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: ["Home Sweet Home", "Entire cabin", "Entire villa"],
    });
  },
};
