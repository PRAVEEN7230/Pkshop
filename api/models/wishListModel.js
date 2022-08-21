const mongoose = require("mongoose");

const WishListSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
    products: [
      {
        productId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "Product" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("WishList", WishListSchema);
