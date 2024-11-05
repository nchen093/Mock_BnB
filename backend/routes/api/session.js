const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const { User, Booking, Spot, Review, ReviewImage } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateLogin = [
  check("credential")
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage("Please provide a valid email or username."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];

const authenticateUser = async (req, res, next) => {
  const { credential, password } = req.body;

  const user = await User.unscoped().findOne({
    where: {
      [Op.or]: {
        username: credential,
        email: credential,
      },
    },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = { credential: "The provided credentials were invalid." };
    return next(err);
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
  };

  await setTokenCookie(res, safeUser);

  req.user = safeUser; // Attach the logged-in user to the req object

  return safeUser;
};

// Used for restoring session user
router.post("/", validateLogin, async (req, res, next) => {
  try {
    const safeUser = await authenticateUser(req, res, next);
    return res.json({ user: safeUser });
  } catch (err) {
    next(err);
  }
});

// Used to logout the user
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

// Restore session user
router.get("/", (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return res.json({
      user: safeUser,
    });
  } else return res.json({ user: null });
});

//GET all bookings from the logged in user
router.get("/bookings", async (req, res) => {
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
        // {
        //   model: User,
        //   as: "renter_history",
        // },
        // {
        //   model: User,
        //   as: "owner_history",
        // },
      ],
    });
    return res.json(bookings);
  }
  return res.json({ bookings: null });
});

//POST all bookings from the logged in user
// router.post("/bookings", async (req, res) => {
//   const { user } = req;

//   try {
//     if (user) {
//       const { spotId, startDate, endDate } = req.body;
//       const spot = await Spot.findByPk(spotId);
//       if (!spot) {
//         return res.status(404).json({ message: "Spot not found" });
//       }
//       const ownerId = spot.ownerId === user.id ? user.id : null;
//       const booking = await Booking.create({
//         spotId,
//         renterId: user.id,
//         ownerId: ownerId,
//         startDate,
//         endDate,
//       });
//       return res.status(201).json(booking);
//     }
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// });

//EDIT a booking by Id
// router.put("/bookings/:bookingId", async (req, res) => {
//   try {
//     const { user } = req;
//     const { bookingId } = req.params;
//     const { startDate, endDate } = req.body;
//     if (user) {
//       const booking = await Booking.findByPk(bookingId);
//       if (booking.userId === user.id) {
//         booking.startDate = startDate;
//         booking.endDate = endDate;
//         await booking.save();
//         return res.status(200).json(booking);
//       }
//     }
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// });

//DELETE a booking by Id

// router.delete("/bookings/:bookingId", async (req, res) => {
//   try {
//     const { user } = req;
//     const { bookingId } = req.params;
//     if (user) {
//       const booking = await Booking.findByPk(bookingId);
//       if (booking.userId === user.id) {
//         await booking.destroy();
//         return res.status(200).json({ message: "Booking deleted" });
//       }
//     }
//   } catch (err) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// });

// GET all Spots owned from the logged in user
// router.get("/spots", async (req, res) => {
//   const { user } = req;
//   if (user) {
//     const spots = await Spot.findAll({
//       where: {
//         ownerId: user.id,
//       },
//     });
//     return res.json(spots);
//   }
//   return res.json({ spots: null });
// });

//GET all reviews from the logged in user
// router.get("/reviews", async (req, res) => {
//   const { user } = req;
//   if (user) {
//     const reviews = await Review.findAll({
//       where: {
//         userId: user.id,
//       },
//       include: [
//         {
//           model: Spot,
//         },
//         {
//           model: User,
//         },
//         {
//           model: ReviewImage,
//           attributes: {
//             exclude: ["createdAt", "updatedAt", "reviewId"],
//           },
//         },
//       ],
//     });
//     return res.json(reviews);
//   }
//   return res.json({ reviews: null });
// });

module.exports = router;
