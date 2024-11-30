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
        previewImage:
          "https://a0.muscache.com/im/pictures/miso/Hosting-833588507621223725/original/ade526d5-b237-4444-9810-42b1e177bc55.jpeg",
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
        previewImage:
          "https://a0.muscache.com/im/pictures/miso/Hosting-863612129491577223/original/c42ae597-4911-4992-90a1-7e2659ff02ac.jpeg",
      },

      {
        ownerId: 1,
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
        previewImage:
          "https://a0.muscache.com/im/pictures/hosting/Hosting-1203970905754828183/original/e566bc5d-ce01-4738-8c88-d29e553ccac1.jpeg",
      },

      {
        ownerId: 2,
        address: "123 Sunset Blvd",
        city: "Los Angeles",
        state: "California",
        country: "USA",
        lat: 34.052235,
        lng: -118.243683,
        name: "Penthouse Suite",
        description:
          "Luxurious penthouse with an incredible city view. Perfect for those looking for a lavish stay with all the amenities in a prime location",
        price: 850,
        previewImage:
          "https://a0.muscache.com/im/pictures/miso/Hosting-1066671149345730403/original/a6794fec-63a6-4017-9ef8-31cf0d447982.jpeg",
      },
      {
        ownerId: 3,
        address: "789 Ocean Drive",
        city: "Miami Beach",
        state: "Alajuela",
        country: "Florida",
        lat: 25.7617,
        lng: -80.1918,
        name: "Beachfront Bungalow",
        description:
          "Cozy beachfront bungalow with a private garden. Wake up to the sound of waves crashing, and enjoy stunning ocean views right from your terrace.",
        price: 300,
        previewImage:
          "https://a0.muscache.com/im/pictures/3b2bd014-6f59-4b14-bbba-e06acab2f67e.jpg",
      },
      {
        ownerId: 1,
        address: "456 Mountain Peak Road",
        city: "Aspen",
        state: "Colorado",
        country: "USA",
        lat: 39.1911,
        lng: -106.8175,
        name: "Luxury Chalet",
        description:
          "A luxurious mountain chalet perfect for winter getaways. With easy access to ski slopes and breathtaking mountain views, this is a winter wonderland.",
        price: 550,
        previewImage:
          "https://a0.muscache.com/im/pictures/miso/Hosting-34512345/original/e1877938-06f0-452f-bab7-58f760e14495.jpeg",
      },
      {
        ownerId: 2,
        address: "101 Seaside Street",
        city: "Barcelona",
        state: "Alajuela",
        country: "Spain",
        lat: 41.3784,
        lng: 2.1929,
        name: "Seaside Villa",
        description:
          "This elegant seaside villa offers the best of Mediterranean luxury. Enjoy panoramic views of the coast, private pools, and outdoor dining spaces.",
        price: 720,
        previewImage:
          "https://a0.muscache.com/im/pictures/cd6274d1-9cae-43db-bee1-54e9dade89a6.jpg",
      },
      {
        ownerId: 3,
        address: "852 Forest Edge",
        city: "Vancouver",
        state: "British Columbia",
        country: "Canada",
        lat: 49.2827,
        lng: -123.1207,
        name: "Forest Retreat",
        description:
          "A peaceful forest retreat, hidden away in nature, perfect for getting away from the hustle and bustle of city life. Enjoy hiking trails and private hot tubs.",
        price: 400,
        previewImage:
          "https://a0.muscache.com/im/pictures/miso/Hosting-710813179854029999/original/a0239672-a384-439d-be7e-3727bd170291.jpeg?im_w=960",
      },
      {
        ownerId: 1,
        address: "100 Royal Plaza",
        city: "London",
        state: "England",
        country: "United Kingdom",
        lat: 51.5074,
        lng: -0.1278,
        name: "Royal Penthouse",
        description:
          "A luxurious penthouse in the heart of London. Enjoy panoramic views of the city skyline, with all the modern amenities you could ever want.",
        price: 750,
        previewImage:
          "https://a0.muscache.com/im/pictures/miso/Hosting-1005823459945172808/original/1b4536b1-673c-43e9-b92d-9166740bf90a.jpeg",
      },
      {
        ownerId: 3,
        address: "303 Alpine Ridge",
        city: "Zurich",
        state: "Zurich",
        country: "Switzerland",
        lat: 47.3769,
        lng: 8.5417,
        name: "Alpine Chalet",
        description:
          "Escape to the Swiss Alps in this cozy chalet with rustic wooden interiors, a hot tub, and views of the snow-covered mountains. Perfect for winter getaways.",
        price: 650,
        previewImage:
          "https://a0.muscache.com/im/pictures/44745891/6aa7a69b_original.jpg",
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
