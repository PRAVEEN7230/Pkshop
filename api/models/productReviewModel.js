const mongoose = require("mongoose");

const ProductReviewSchema = new mongoose.Schema(
  { 
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
    productId: {type: mongoose.SchemaTypes.ObjectId, ref: "Product", required: true },
    productReview:{
        title: { type: String, required: true },
        desc: { type: String, required: true },
        rating: { type: Number, required: true },
        upVotes: { type: Number, default: 0 },
        downVotes: { type: Number, default: 0 },
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductReview", ProductReviewSchema);
