const express = require("express");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const bookingsRouter = require("./bookings.js");
const reviewsRouter = require("./reviews.js");
const router = express.Router();

router.use("/bookings", bookingsRouter);
router.use("/reviews", reviewsRouter);

router.get("/", async (req, res) => {
  const { user } = req;
  if (user) {
    return res.json(user);
  } else {
    return res.json({ user: null });
  }
});

module.exports = router;
