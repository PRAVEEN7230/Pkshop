const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
    products: [
      {
        productId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "Product" },
        quantity: { type: Number, default: 1, },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
