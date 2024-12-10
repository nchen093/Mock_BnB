const { Sequelize } = require("sequelize");
const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Spot } = require("../../db/models");
const bookingsRouter = require("./bookings.js");
const router = express.Router();
router.use("/bookings", bookingsRouter);
const { Review } = require("../../db/models");

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
    ],
    group: ["Spot.id"],
  });

  return res.status(200).json(spots);
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
