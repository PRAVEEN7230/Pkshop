const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        required: true
      },
      lastName: String
    },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type:Number },
    isAdmin: { type: Boolean, default: false, },
    img: { type: String },
    status: { type: Boolean, default: false, },
    address: { type: Object, default: {} },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
