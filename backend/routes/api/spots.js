const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { User, Booking, Spot, Review, ReviewImage } = require("../../db/models");
const { requireAuth } = require("../../utils/auth");
const { check, validationResult } = require("express-validator");

// GET all Spots owned from the logged in user
router.get("/", requireAuth, async (req, res) => {
  const { user } = req;

  if (user) {
    const spots = await Spot.findAll({
      where: {
        ownerId: user.id,
      },
    });
    return res.json(spots);
  }
  return res.json({ spots: null });
});

// POST a new Spot for current User
router.post("/", requireAuth, async (req, res) => {
  const { user } = req;
  if (user) {
    const {
      name,
      price,
      description,
      address,
      city,
      lat,
      lng,
      state,
      zipCode,
      country,
      previewImage,
    } = req.body;
    const spot = await Spot.create({
      ownerId: user.id,
      avgRating: 0,
      name,
      price,
      lat,
      lng,
      description,
      address,
      city,
      state,
      zipCode,
      country,
      previewImage,
    });
    return res.status(201).json(spot);
  }
  return res.status(401).json({ message: "Unauthorized" });
});

module.exports = router;
