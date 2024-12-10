const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { requireAuth } = require("../../utils/auth");
const { validationResult } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

const {
  User,
  Review,
  ReviewImage,
  Spot,
  SpotImage,
  Booking,
} = require("../../db/models");
const booking = require("../../db/models/booking");

const spotValidationRules = [
  check("address").notEmpty().withMessage("Street address is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("state").notEmpty().withMessage("State is required"),
  check("country").notEmpty().withMessage("Country is required"),
  check("lat")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be within -90 and 90"),
  check("lng")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be within -180 and 180"),
  check("name")
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check("description").notEmpty().withMessage("Description is required"),
  check("price")
    .isFloat({ min: 0 })
    .withMessage("Price per day must be a positive number"),
  handleValidationErrors,
];

const reviewValidationRules = [
  check("comment").notEmpty().withMessage("Review text is required"),
  check("stars")
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

const bookingValidationRules = [
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

const queryValidationRules = [
  check("page")
    .isInt({ min: 1 })
    .optional()
    .withMessage("Page must be greater than or equal to 1"),
  check("size")
    .isInt({ min: 1, max: 20 })
    .optional()
    .withMessage("Size must be between 1 and 20"),
  check("maxLat")
    .isFloat({ min: -90, max: 90 })
    .optional()
    .withMessage("Maximum latitude is invalid"),
  check("minLat")
    .isFloat({ min: -90, max: 90 })
    .optional()
    .withMessage("Minimum latitude is invalid"),
  check("maxLng")
    .isFloat({ min: -180, max: 180 })
    .optional()
    .withMessage("Longitude must be within -180 and 180"),
  check("minLng")
    .isFloat({ min: -180, max: 180 })
    .optional()
    .withMessage("Longitude must be within -180 and 180"),
  check("minPrice")
    .isFloat({ min: 0 })
    .optional()
    .withMessage("Minimum price must be greater than or equal to 0"),
  check("maxPrice")
    .isFloat({ min: 0 })
    .optional()
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors,
];

//Delete a spot Image
router.delete(
  "/:spotId/spot-images/:imageId",
  requireAuth,
  async (req, res, next) => {
    const { spotId, imageId } = req.params;
    const { user } = req;

    try {
      const image = await SpotImage.findOne({
        where: { id: imageId, spotId: spotId },
        include: { model: Spot, attributes: ["ownerId"] },
      });
      if (!image) {
        return res
          .status(404)
          .json({ message: "Spot Image couldn't be found" });
      }
      const ownerId = image.Spot.ownerId;
      if (user.id !== ownerId) {
        return res
          .status(403)
          .json({ message: "You are not allowed to delete this image" });
      }

      await image.destroy();

      return res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Get all Bookings for a Spot based on the Spot's id
router.get("/:spotId/bookings", requireAuth, async (req, res) => {
  const { spotId } = req.params;
  const { user } = req;

  console.log(user);

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot not found" });
    }

    // if they are the owner of a spot
    if (spot.ownerId === user.id) {
      const bookings = await Booking.findAll({
        where: { spotId },
        attributes: [
          "id",
          "spotId",
          "ownerId",
          "renterId",
          "startDate",
          "endDate",
          "createdAt",
          "updatedAt",
        ],
        include: [
          {
            model: User,
            as: "renter_history",
            attributes: ["id", "firstName", "lastName"],
          },

          {
            model: User,
            as: "owner_history",
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      });
      return res.status(200).json({ Bookings: bookings });
    }

    // Not the owner of a spot
    if (spot.ownerId !== user.id) {
      const bookings = await Booking.findAll({
        where: { spotId },
        attributes: ["spotId", "startDate", "endDate"],
      });
      return res.status(200).json({ Bookings: bookings });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "There is an Internal Error" });
  }
});

// Create a Booking from a Spot based on the Spot's id
router.post(
  "/:spotId/bookings",
  requireAuth,
  bookingValidationRules,
  async (req, res) => {
    const { spotId } = req.params;
    const { user } = req;
    const { startDate, endDate } = req.body;

    try {
      const spot = await Spot.findByPk(spotId);

      if (!spot) {
        return res.status(404).json({ message: "Spot not found" });
      }

      const existingBooking = await Booking.findOne({
        where: {
          spotId,
          startDate: {
            [Op.lte]: endDate,
          },
          endDate: {
            [Op.gte]: startDate,
          },
        },
      });

      if (existingBooking) {
        return res.status(403).json({
          message: "The spot is already booked for the selected dates.",
          errors: {
            startDate: "Start date conflicts with an existing booking",
            endDate: "End date conflicts with an existing booking",
          },
        });
      }

      const booking = await Booking.create({
        spotId,
        ownerId: spot.ownerId,
        renterId: user.id,
        startDate,
        endDate,
      });

      return res.status(201).json(booking);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

//Get all Reviews by a Spot's id
router.get("/:spotId/reviews", async (req, res) => {
  const { spotId } = req.params;
  try {
    const spot = await Spot.findByPk(spotId);
    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    const review = await Review.findAll({
      where: { spotId },
      attributes: [
        "id",
        "userId",
        "spotId",
        "comment",
        "stars",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: User,
          attributes: ["id", "firstName", "lastName"],
        },
        {
          model: ReviewImage,
          as: "ReviewImages",
          attributes: ["id", "url"],
        },
      ],
    });

    return res.status(200).json({ Reviews: review });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "accessing failure" });
  }
});

// Create a Review for a Spot based on the Spot's id
router.post(
  "/:spotId/reviews",
  requireAuth,
  reviewValidationRules,
  async (req, res, next) => {
    const { spotId } = req.params;
    const { user } = req;
    const { comment, stars } = req.body;
    const userId = user.id;

    try {
      const spot = await Spot.findByPk(spotId);
      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }
      // Check if the user already has a review for this spot
      const existingReview = await Review.findOne({
        where: { userId, spotId },
      });

      if (existingReview) {
        // If the user already has a review, return a 500 error with the appropriate message
        return res
          .status(500)
          .json({ message: "User already has a review for this spot" });
      }

      // Create a new review if no existing review is found
      const newReview = await Review.create({
        spotId,
        userId,
        comment,
        stars,
      });

      return res.status(201).json(newReview);
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ error: "An error occurred while processing the review" });
    }
  }
);

// Create an Image for a spot
router.post("/:spotId/images", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;
  const { url, preview } = req.body;
  try {
    const spot = await Spot.findOne({ where: { id: spotId } });
    if (!spot) {
      res.status(404);
      return res.json({ message: "Spot couldn't be found" });
    }

    // create new Spotimage instance
    const newSpotImage = await SpotImage.create({
      spotId,
      url,
      preview,
    });

    const spotImageResponse = newSpotImage.get({ plain: true });

    delete spotImageResponse.spotId;
    delete spotImageResponse.createdAt;
    delete spotImageResponse.updatedAt;

    //message: 'Image added successfully',
    return res.status(201).json(spotImageResponse);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "An error occured while fetching spots" });
  }
});

// GET details of a Spot from an id
router.get("/:spotId", async (req, res, next) => {
  const { spotId } = req.params;
  try {
    const spot = await Spot.findByPk(spotId, {
      attributes: [
        "id",
        "ownerId",
        "address",
        "city",
        "state",
        "country",
        "lat",
        "lng",
        "name",
        "description",
        "price",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: SpotImage,
          attributes: ["id", "url", "preview"],
        },
        {
          model: User,
          as: "Owner",
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    if (!spot) {
      res.status(404);
      return res.json({ message: "Spot couldn't be found" });
    }

    // calcuate the numReviews and AvgStarRating
    const reviews = await Review.findAll({
      where: {
        spotId: spotId,
      },
      attributes: ["stars"],
    });

    // calculate the avg of staring for a spot
    const sumStars = await reviews.reduce(
      (sum, review) => sum + review.dataValues.stars,
      0
    );
    const avgStarRating = sumStars / reviews.length;

    // calcuate the number of reivews
    const numReviews = reviews.length;

    return res.json({
      ...spot.toJSON(),
      numReviews,
      avgStarRating,
    });
  } catch (e) {
    console.error(e);
    res.status(500);
    return res.json({ error: "An error occured while fetching spots" });
  }
});

// Edit a Spot
router.put(
  "/:spotId",
  requireAuth,
  spotValidationRules,
  async (req, res, next) => {
    const { user } = req;
    const { spotId } = req.params;
    const {
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    } = req.body;

    try {
      const spot = await Spot.findByPk(spotId);

      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }

      if (spot.ownerId !== user.id) {
        return res.status(403).json({ message: "You are not allow to edit" });
      }
      const updateSpot = await spot.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        previewImage,
      });

      const updatedSpot = updateSpot.get({ plain: true });

      delete updatedSpot.previewImage;

      return res.status(200).json(updatedSpot);
    } catch (e) {
      console.error(e);
      return res
        .status(500)
        .json({ error: "An error occured while fetching spots" });
    }
  }
);

// Delete a spot
router.delete("/:spotId", requireAuth, async (req, res, next) => {
  const { spotId } = req.params;

  try {
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }

    await spot.destroy();

    return res.status(200).json({ message: "Successfully deleted" });
  } catch (e) {
    console.error(e);
    res.status(500);
    return res.json({ error: "An error occured while fetching spots" });
  }
});

// Create a spot
router.post("/", spotValidationRules, requireAuth, async (req, res, next) => {
  const { user } = req;
  const ownerId = user.id;

  const {
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  } = req.body;

  try {
    const spot = await Spot.create({
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    });

    return res.status(201).json(spot);
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .json({ error: "An unexpected error occurred while creating the spot." });
  }
});

// Add query and GET ALL Spot
router.get("/", queryValidationRules, async (req, res) => {
  let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  // page = parseInt(page);
  // size = parseInt(size);

  // if (isNaN(page) || page < 1) page = 1;
  // if (isNaN(size) || size < 1 || size > 20) size = 20;

  // const pagination = {};
  // if (page >= 1 && size >= 1) {
  //   pagination.limit = size;
  //   pagination.offset = size * (page - 1);
  // }

  const test = {};
  if (minLat) test.lat = { [Op.gte]: parseFloat(minLat) };
  if (maxLat) test.lat = { ...test.lat, [Op.lte]: parseFloat(maxLat) };
  if (minLng) test.lng = { [Op.gte]: parseFloat(minLng) };
  if (maxLng) test.lng = { ...test.lng, [Op.lte]: parseFloat(maxLng) };
  if (minPrice) test.price = { [Op.gte]: parseFloat(minPrice) };
  if (maxPrice) test.price = { ...test.price, [Op.lte]: parseFloat(maxPrice) };

  try {
    const spots = await Spot.findAll({
      where: test,
      attributes: {
        include: [
          [sequelize.fn("AVG", sequelize.col("Reviews.stars")), "avgRating"],
        ],
      },
      include: [
        {
          model: Review,
          attributes: [],
        },
      ],
      group: ["Spot.id"],
      // ...pagination,
    });

    // const spotsWithReviews = spots.map((spot) => ({
    //   ...spot.dataValues,
    //   avgRating: parseFloat(spot.dataValues.avgRating) || 0, // Handle cases where there are no reviews
    // }));

    const spotsWithReviews = spots.map((spot) => {
      return {
        ...spot.dataValues,
        avgRating: spot.dataValues.avgRating
          ? parseFloat(spot.dataValues.avgRating).toFixed(1)
          : "No Comment",
      };
    });

    return res.json({
      Spots: spotsWithReviews,
      // page,
      // size,
    });
  } catch (e) {
    console.error(e);
    res.status(500);
    return res.json({ error: "An error occured while fetching spots" });
  }
});

module.exports = router;
