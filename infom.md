// GET USER
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "email", "username", "firstName", "lastName"],
      include: [
        {
          model: Review,
          include: [
            {
            model: ReviewImage
            },
          ],
        },

        {
          model: Spot,
          include: [
            {
            model: SpotImage
            },
          ],
        },

        {
          model: Booking,
          as: 'renter_history',
          attributes: ["startDate", "endDate"],
          include: [
            {
              model: Spot,
              attributes: ["id", "name"],
            },
          ],
        },

        {
          model: Booking,
          as: "owner_history",
          attributes: ["startDate", "endDate"],
          include: [
            {
              model: Spot,
              attributes: ["id", "name"],
            },
          ],
        },
      ],
    });
    res.json(users);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Internal Server Error" });
  }
});