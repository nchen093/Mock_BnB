const router = require("express").Router();

router.get("/", function (req, res) {
  res.json({ message: "Test response" });
});

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

module.exports = router;
