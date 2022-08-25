const mongoose = require("mongoose");

const DiscountCouponSchema = new mongoose.Schema(
  { users: [
    {
      userId: {type: mongoose.SchemaTypes.ObjectId, ref: "User"}
    }
  ],
    discountCoupon:{
        couponCode: { type: String, required: true },
        discount: { type: Number, default: 10, },
        minimumOrderValue: { type: Number, default: 500, },
        flatDiscount: {type: Boolean, default: false},
        upto: { type: Number},
        categories: { type: Array},
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DiscountCoupon", DiscountCouponSchema);
