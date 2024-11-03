"use strict";

const { Spot } = require("../models");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await Spot.bulkCreate(
      [
        {
          ownerId: 1,
          address: 'Princess Pond Road',
          city: 'Summerton',
          state: 'South Carolina',
          country: 'United States of America',
          lat: 37.7645358,
          lng: -122.4730327,
          name: 'Home Sweet Home',
          description: "Welcome to the White House! Experience peace and tranquillity like never before in this exquisite home nestled along the shores of Lake Marion. Boasting 4 spacious bedrooms and 3.5 bathrooms, the whole family can enjoy ample space and luxury. Featuring an incredible private infinity pool, swim spa, chefs kitchen, private dock, gas grill, HDTV's in almost every room, and a master suite that is second to none. Hosted by Lake Marion Luxury Vacations and Concierge.",
          price: 411,
          avgRating: 4.97,
          previewImage: 1,

      },

      {
        ownerId: 2,
        address: 'Hill View Lodge',
        city: 'Lincolnshire',
        state: 'Lincoln',
        country: 'United Kingdom',
        lat: 53.1956334,
        lng: -0.5615123,
        name: 'Entire cabin',
        description: "A stylish 1 x bedroom log cabin perfect for a couple. Set in a peaceful, rural location on the edge of the Lincolnshire Wolds. Open views to the east coast some 10 miles away. The historic town of Louth with it's many cafes, restaurants & independent shops is only 5 minutes away. Coastal towns of Skegness, Mablethorpe & Cleethorpes, Market town of Horncastle, Dambusters famous Woodall Spa & Lincoln Cathedral are within local area.",
        price: 119,
        avgRating: 4.97,
        previewImage: 1
    },

    {
        ownerId: 3,
        address: '54234 Disney Land',
        city: 'La Fortuna',
        state: 'Alajuela',
        country: 'Costa Rica',
        lat: 10.5085456,
        lng: -84.6459234,
        name: 'Entire villa',
        description: `Ideal villa for resting , surrounded by nature. A magnificent space to celebrate honeymoons, anniversaries or birthdays,
        or just to disconnect from stress. With a relaxing jacuzzi, hydro massage and hot water, you can enjoy on your totally private terrace, overlooking the garden.`,
        price: 160,
        avgRating: 4.94,
        previewImage: 1
    },
    

    ]
    )

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {});
  }
};