const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    products: [
      {
        productId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "Product" },
        title: { type: String, required: true, unique: true },
        desc: { type: String, required: true },
        img: { type: String, required: true },
        categories: { type: Array },
        size: { type: Array },
        color: { type: Array },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1, },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
