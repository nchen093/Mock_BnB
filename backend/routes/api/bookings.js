const express = require("express");
const { Op } = require("sequelize");
const { format } = require("sequelize/lib/utils");
const { Booking } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
  const bookings = await Booking.findAll();
  res.json(bookings);
});

module.exports = router;
