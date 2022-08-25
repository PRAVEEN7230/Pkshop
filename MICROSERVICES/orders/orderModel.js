const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
    name: { type: String, required: true },
    email: { type: String, required: true },
    products: [
      {
        productId: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "Product" },
        title: { type: String, required: true,},
        desc: { type: String, required: true },
        img: { type: String, required: true },
        categories: { type: Array, required: true },
        size: { type: Array },
        color: { type: Array },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1, },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
