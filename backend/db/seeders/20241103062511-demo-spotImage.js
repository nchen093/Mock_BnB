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
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-833588507621223725/original/7e66eff3-2b3f-4121-96ab-19959f227db9.jpeg",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-833588507621223725/original/81ccab51-1991-442e-8a8d-e94ed714eda6.jpeg",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-833588507621223725/original/a66f5797-8409-4a76-ba92-7c6ac42ce16d.jpeg",
        preview: false,
      },
      {
        spotId: 1,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-833588507621223725/original/b248423a-697d-4d3c-8517-c32c831c09c8.jpeg",
        preview: false,
      },

      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-863612129491577223/original/c42ae597-4911-4992-90a1-7e2659ff02ac.jpeg",
        preview: true,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-863612129491577223/original/10cf1048-9e61-4f96-a097-b58439f3023d.jpeg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-863612129491577223/original/30889ad7-76b5-4d94-bfba-8ec94c8e8a72.jpeg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-863612129491577223/original/f167799d-4ede-494c-8235-c721d3624ac4.jpeg",
        preview: false,
      },
      {
        spotId: 2,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-863612129491577223/original/6d0fb97b-a4ec-4f35-9771-bcde1fe8ceb8.jpeg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1203970905754828183/original/e566bc5d-ce01-4738-8c88-d29e553ccac1.jpeg",
        preview: true,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/8de1a412-52e5-4dcd-9a82-1d4bd40ce692.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-662933119240825735/original/617285c4-378d-4631-924d-75dffbdcaa06.jpeg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/e6e813a4-17c5-4c5c-a8a9-aece28336fce.jpg",
        preview: false,
      },
      {
        spotId: 3,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-662933119240825735/original/6edfeef8-5b0d-442f-a7b3-ede4a407994d.jpeg",
        preview: false,
      },

      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1066671149345730403/original/a6794fec-63a6-4017-9ef8-31cf0d447982.jpeg",
        preview: true,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1066671149345730403/original/7ddca217-baf1-498d-8ca6-5575fc75941f.jpeg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1066671149345730403/original/af477b32-7592-46d5-8852-5f913fb5c9ea.jpeg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1066671149345730403/original/af310be3-ec20-4324-b990-351181b68249.jpeg",
        preview: false,
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1066671149345730403/original/283da790-ebe6-4ada-b507-d851dab797f3.jpeg",
        preview: false,
      },

      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/3b2bd014-6f59-4b14-bbba-e06acab2f67e.jpg",
        preview: true,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/6e6838d2-f696-498a-89c9-354faf6130c1.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/dcf44cbc-5994-4125-9352-81d34f2fc739.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/f6e7c3cb-d85d-4f49-8380-97a0f57968f1.jpg",
        preview: false,
      },
      {
        spotId: 5,
        url: "https://a0.muscache.com/im/pictures/eadb3b65-dbdf-4b3e-ae69-4bdd85378f34.jpg",
        preview: false,
      },

      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-34512345/original/e1877938-06f0-452f-bab7-58f760e14495.jpeg",
        preview: true,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-34512345/original/192f0bb3-5db8-420b-8222-5f6bf815a667.jpeg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-34512345/original/41cedde1-1b2f-4366-9cf2-e59f499cea7a.jpeg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-34512345/original/80450e6d-af11-45fa-a71e-fb64f0165468.jpeg",
        preview: false,
      },
      {
        spotId: 6,
        url: "https://a0.muscache.com/im/pictures/6ec6e581-9c76-4507-8cb7-0814870fa611.jpg",
        preview: false,
      },

      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/cd6274d1-9cae-43db-bee1-54e9dade89a6.jpg",
        preview: true,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/a4f54b4b-220b-4310-82b2-6a2b13f19ed2.jpg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/12fdcfb2-5ba6-4100-889a-91bb8f1d0617.jpg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/bbfc64fa-dd02-4902-93a0-deeed7dc008e.jpg",
        preview: false,
      },
      {
        spotId: 7,
        url: "https://a0.muscache.com/im/pictures/8ea3a1e6-28ac-4eb9-895f-47ef64ab9cc6.jpg",
        preview: false,
      },

      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/3512590a-01b4-4795-9d6b-70f35b44cdb1.jpg",
        preview: true,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-686402035876821572/original/a84a00c8-3b07-48b9-841b-9b0093e72bda.jpeg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-686402035876821572/original/78b7affc-d1d6-471d-a7f4-12acb3067a61.jpeg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/eda68b9a-6de0-4733-af78-fdf654bc720f.jpg",
        preview: false,
      },
      {
        spotId: 8,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-686402035876821572/original/497bf287-d735-4195-bae1-aa12c08aa102.jpeg",
        preview: false,
      },

      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1005823459945172808/original/1b4536b1-673c-43e9-b92d-9166740bf90a.jpeg",
        preview: true,
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1005823459945172808/original/b45519af-acee-4809-9e3c-6393685001bd.jpeg",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1005823459945172808/original/5b6d9848-321f-499a-b94b-3160584313b4.jpeg",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/miso/Hosting-1005823459945172808/original/01ca85f4-e888-4b4b-9b60-26683ecc09b1.jpeg",
        preview: false,
      },
      {
        spotId: 9,
        url: "https://a0.muscache.com/im/pictures/hosting/Hosting-1005823459945172808/original/04e5b31d-23b6-4c71-8cb5-fd471bacd031.jpeg",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/44745891/6aa7a69b_original.jpg",
        preview: true,
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/8f95553f-452e-4048-bdfe-1bb1c9ba0fa8.jpg",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/29e0e1b5-454d-47c9-813a-c245a1dbe8d0.jpg",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/44745823/70eadbbd_original.jpg",
        preview: false,
      },
      {
        spotId: 10,
        url: "https://a0.muscache.com/im/pictures/45567692/82d327ed_original.jpg",
        preview: false,
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
