const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true},
    lastName: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    Phone: { type:Number },
    isAdmin: { type: Boolean, default: false, },
    img: { type: String },
    status: { type: Boolean, default: false, },
    address: { type: Object, default: {} },
    wishList: { type: Array, default: [], },
    orders: { type: Array, default: [], },
    cart: { type: Array, default: [], },
    discountCoupons: { type: Array, default: [], },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
