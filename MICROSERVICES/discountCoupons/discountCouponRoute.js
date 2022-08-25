const { 
  welcomeToService,
  updateDiscountCoupon,
  addNewDiscountCoupon, 
  deleteDiscountCoupon,
  getUserDiscountCoupon,
  getAllDiscountCoupon 
} = require("./discountCouponController");
const {
  verifyTokenAndAdmin, verifyTokenAndAuthorization,
} = require("./middleware/verifyToken");

const router = require("express").Router();

//WELCOME
router.get("/", welcomeToService);

//CREATE
router.post("/add", verifyTokenAndAdmin, addNewDiscountCoupon);

//UPDATE
router.put("/update/:id", verifyTokenAndAdmin, updateDiscountCoupon);

//DELETE
router.delete("/delete/:id", verifyTokenAndAdmin, deleteDiscountCoupon);

//GET ALL DISCOUNT COUPON FOR A USER
router.get("/for/:userId", verifyTokenAndAuthorization, getUserDiscountCoupon);

//GET ALL DISCOUNT COUPON
router.get("/all", verifyTokenAndAdmin, getAllDiscountCoupon);

module.exports = router;
