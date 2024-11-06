const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { User, Booking, Spot } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const validateBooking = [
  check("startDate")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a start date.")
    .isISO8601()
    .withMessage("Please provide a valid date.")
    .custom((value) => {
      const startDate = new Date(value);
      const now = new Date();
      if (startDate < now) {
        throw new Error("startDate cannot be in the past");
      }
      return true;
    }),
  check("endDate")
    .exists({ checkFalsy: true })
    .withMessage("Please provide an end date.")
    .isISO8601()
    .withMessage("Please provide a valid date.")
    .custom((value, { req }) => {
      const endDate = new Date(value);
      const startDate = new Date(req.body.startDate);
      if (endDate <= startDate) {
        throw new Error("endDate cannot be on or before startDate");
      }
      return true;
    }),
  handleValidationErrors,
];

router.get("/", async (req, res) => {
  const { user } = req;
  console.log(user);
  if (user) {
    const bookings = await Booking.findAll({
      where: {
        [Op.or]: [{ renterId: user.id }, { ownerId: user.id }],
      },
      include: [
        {
          model: Spot,
        },
        {
          model: User,
          as: "renter_history",
        },
        {
          model: User,
          as: "owner_history",
        },
      ],
    });

    if (!bookings) {
      return res.status(404).json({ message: "Booking is not found" });
    }
    return res.status(200).json(bookings);
  } else {
    return res.status(401).json({
      message: "Unauthorized, User does not have access to this information",
    });
  }
});

//POST all bookings from the logged in user
router.post("/", async (req, res) => {
  const { user } = req;
  try {
    if (user) {
      const { spotId, startDate, endDate } = req.body;
      const spot = await Spot.findByPk(spotId);
      if (!spot) {
        return res.status(404).json({ message: "Spot not found" });
      }
      const ownerId = spot.ownerId === user.id ? user.id : null;
      const booking = await Booking.create({
        spotId,
        renterId: user.id,
        ownerId: ownerId,
        startDate,
        endDate,
      });
      return res.status(200).json(booking);
    }
  } catch (err) {
    return res.status(401).json({ message: "Issue with creating the booking" });
  }
});

// EDIT a booking by Id
router.put("/:bookingId", validateBooking, async (req, res, next) => {
  try {
    const { user } = req;
    const { bookingId } = req.params;
    const { startDate, endDate } = req.body;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.ownerId !== user.id && booking.renterId !== user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    booking.startDate = startDate;
    booking.endDate = endDate;
    await booking.save();

    return res.status(200).json(booking);
  } catch (err) {
    return res.status(401).json({ message: "Issue with editing the booking" });
  }
});

//DELETE a booking by Id

router.delete("/:bookingId", async (req, res) => {
  try {
    const { user } = req;
    const { bookingId } = req.params;

    if (user) {
      const booking = await Booking.findByPk(bookingId);
      if (!booking) {
        return res.status(404).json({ message: "Booking couldn't be found" });
      }

      if (booking.startDate < new Date()) {
        return res.status(403).json({
          message: "Bookings that have been started can't be deleted",
        });
      }

      if (booking.renterId === user.id || booking.ownerId === user.id) {
        await booking.destroy();
        return res.status(200).json({ message: "Successfully deleted" });
      }
    }
  } catch (err) {
    return res.status(401).json({ message: "Issue with deleting the booking" });
  }
});

module.exports = router;
