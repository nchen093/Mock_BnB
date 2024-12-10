const { Sequelize } = require("sequelize");
const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Spot, SpotImage } = require("../../db/models");
const bookingsRouter = require("./bookings.js");
const router = express.Router();
const { Review } = require("../../db/models");

router.use("/bookings", bookingsRouter);

//get all spots by current user
router.get("/spots", async (req, res) => {
  const { user } = req;

  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const spots = await Spot.findAll({
    where: {
      ownerId: user.id,
    },
    attributes: {
      include: [
        [Sequelize.fn("AVG", Sequelize.col("Reviews.stars")), "avgRating"],
      ],
    },
    include: [
      {
        model: Review,
        attributes: [],
      },
      {
        model: SpotImage,
        attributes: ["url"],
        where: { preview: true },
        required: false,
      },
    ],
    group: ["Spot.id", "SpotImages.id"],
  });

  const spotsDetails = spots.map((spot) => {
    return {
      ...spot.dataValues,
      avgRating: spot.dataValues.avgRating
        ? parseFloat(spot.dataValues.avgRating).toFixed(1)
        : null,
      previewImage: spot.SpotImages.length > 0 ? spot.SpotImages[0].url : null,
    };
  });

  return res.json({
    Spots: spotsDetails,
  });
});

router.get("/", async (req, res) => {
  const { user } = req;
  if (user) {
    return res.json(user);
  } else {
    return res.json({ user: null });
  }
});

module.exports = router;
