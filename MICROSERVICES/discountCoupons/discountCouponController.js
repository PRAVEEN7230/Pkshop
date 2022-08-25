const DiscountCoupon = require("./discountCouponModel");

const welcomeToService = (req,res)=> {
  res.status(200).json("Welcome to discount coupons service");
}

const addNewDiscountCoupon = async (req, res) => {
    const newDiscountCoupon = new DiscountCoupon(req.body);
    try {
      const savedDiscountCoupon = await newDiscountCoupon.save();
      res.status(200).json(savedDiscountCoupon);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
const updateDiscountCoupon = async (req, res) => {
    try {
      const updatedDiscountCoupon = await DiscountCoupon.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedDiscountCoupon);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  
const deleteDiscountCoupon = async (req, res) => {
    const discountCoupon = await DiscountCoupon.findById(req.params.id);
    if(discountCoupon){
      discountCoupon.delete()
      res.status(200).json("DiscountCoupon has been deleted...");
    }else{
      res.status(500).json("DiscountCoupon not found");
    }
  }
const getAllDiscountCoupon = async (req, res) => {
  const qCategory = req.query.category;
    try {
      let discountCoupons;
      if (qCategory) {
        discountCoupons = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        discountCoupons = await Product.find();
      }
      res.status(200).json(discountCoupons);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  const getUserDiscountCoupon = async (req, res) => {
    try {
      const discountCoupons = await DiscountCoupon.find({
        users: {
          $in: [req.params.userId],
        },
      });
      res.status(200).json(discountCoupons);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

module.exports = { 
  welcomeToService,
  addNewDiscountCoupon,
  updateDiscountCoupon, 
  deleteDiscountCoupon,
  getUserDiscountCoupon, 
  getAllDiscountCoupon
}