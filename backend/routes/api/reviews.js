const express = require("express");
const { User, Spot, Review, ReviewImage } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");

const router = express.Router();

const validateImage = [
  check("url")
    .notEmpty()
    .isURL()
    .withMessage("Please provide a valid image URL."),
  handleValidationErrors,
];

const validateReview = [
  check("comment")
    .notEmpty()
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .notEmpty()
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer from 1 to 5"),
  handleValidationErrors,
];

router.delete("/:reviewId/images/:imageId", async (req, res) => {
  const { user } = req;
  const { imageId, reviewId } = req.params;
  try {
    const reviewImage = await ReviewImage.findByPk(imageId, {
      include: Review,
    });

    if (!reviewImage) {
      return res.status(404).json({ message: "Image does not exist" });
    }

    const review = await Review.findByPk(reviewImage.reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (!reviewImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    await reviewImage.destroy();
    return res.status(200).json({ message: "Image has been deleted" });
  } catch (error) {
    res.status(401).json({ message: "Image is not valid" });
  }
});

router.post("/:reviewId/images", validateImage, async (req, res) => {
  const { user } = req;
  const { reviewId } = req.params;
  const { url } = req.body;

  try {
    const review = await Review.findByPk(reviewId);
    const reviewImages = await ReviewImage.findAll({ where: { reviewId } });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    if (reviewImages.length >= 10) {
      return res
        .status(403)
        .json({ message: "You can only upload 10 images per review" });
    }

    if (review.userId !== user.id) {
      return res
        .status(403)
        .json({ message: "You do not have access to edit this review" });
    }

    if (review.userId === user.id) {
      const imageUrl = await ReviewImage.create({
        reviewId,
        url,
      });
      return res.status(201).json({ id: imageUrl.reviewId, url: imageUrl.url });
    }
  } catch (error) {
    res.status(401).json({ message: "Review is not valid" });
  }
});

router.put("/:reviewId", validateReview, async (req, res) => {
  const { user } = req;
  const { reviewId } = req.params;
  const { comment, stars } = req.body;
  try {
    const review = await Review.findByPk(reviewId);

    if (review.userId !== user.id) {
      return res
        .status(403)
        .json({ message: "You do not have access to edit this review" });
    }

    if (review.userId === user.id) {
      review.comment = comment;
      review.stars = stars;
      await review.save();
      return res.status(200).json(review);
    }
  } catch (error) {
    res.status(401).json({ message: "Review is not valid" });
  }
});

router.delete("/:reviewId", async (req, res) => {
  const { user } = req;
  const { reviewId } = req.params;
  try {
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }

    if (review.userId !== user.id) {
      return res
        .status(403)
        .json({ message: "You do not have access to edit this review" });
    }

    if (review.userId === user.id) {
      await ReviewImage.destroy({ where: { reviewId } });
      await review.destroy();
      return res.status(200).json({ message: "Review deleted" });
    }
  } catch (error) {
    res.status(401).json({ message: "Review is not valid" });
  }
});

router.get("/", async (req, res) => {
  const { user } = req;
  try {
    const reviews = await Review.findAll({
      where: {
        userId: user.id,
      },
      include: [User, Spot, ReviewImage],
    });
    return res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
