const express = require("express");
const {
  addReview,
  getReviewsByProduct,
} = require("../controllers/ReviewController");

const router = express.Router();

router.post("/", addReview);
router.get("/:productId", getReviewsByProduct);

module.exports = router;
