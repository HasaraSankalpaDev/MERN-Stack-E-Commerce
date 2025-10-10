const ReviewModel = require("../models/ReviewModel");

// ➕ Add review
const addReview = async (req, res) => {
  try {
    const { productId, name, rating, comment } = req.body;
    if (!productId || !name || !comment) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newReview = new ReviewModel({ productId, name, rating, comment });
    await newReview.save();

    res
      .status(201)
      .json({ message: "Review added successfully", review: newReview });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📄 Get reviews by product
const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await ReviewModel.find({ productId }).sort({
      createdAt: -1,
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = { addReview, getReviewsByProduct };
