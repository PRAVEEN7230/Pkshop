const ProductReview = require("./productReviewModel");

const welcomeToService = (req,res)=> {
  res.status(200).json("Welcome to product reviews service");
}

const writeProductReview = async (req, res) => {
    const productReview = await ProductReview.findOne({
        $and: [
        { userId: req.body.userId },
        { productId: req.body.productId },
      ]
    });
    if(productReview){
      res.status(500).json("You already wrote productReview for this product");
    } else{
      const newProductReview = new ProductReview(req.body);
      try {
        const savedProductReview = await newProductReview.save();
        res.status(200).json(savedProductReview);
      } catch (err) {
        res.status(500).json(err.message);
      }
    }
  }
const updateProductReview = async (req, res) => {
    try {
      const updatedProductReview = await ProductReview.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      )
      res.status(200).json(updatedProductReview);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  
const deleteProductReview = async (req, res) => {
    const productReview = await ProductReview.findById(req.params.id);
    if(productReview){
      productReview.delete()
      res.status(200).json("ProductReview has been deleted...");
    }else{
      res.status(500).json("ProductReview not found");
    }
  }
  
const getAllProductReviews = async (req, res) => {
    try {
      const productReviews = await ProductReview.find();
      res.status(200).json(productReviews);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  const getUserProductReviews = async (req, res) => {
    try {
      const productReviews = await ProductReview.find({ userId: req.params.userId,});
      res.status(200).json(productReviews);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  const getProductReviews = async (req, res) => {
    try {
      const productReviews = await ProductReview.findOne({ productId: req.params.productId, });
      res.status(200).json(productReviews);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

module.exports = { 
  welcomeToService,
  writeProductReview,
  updateProductReview, 
  deleteProductReview,
  getUserProductReviews, 
  getProductReviews, 
  getAllProductReviews
}