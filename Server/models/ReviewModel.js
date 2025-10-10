const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Review || mongoose.model("Review", ReviewSchema);
