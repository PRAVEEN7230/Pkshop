const { 
  updateProductReview,
  writeProductReview, 
  deleteProductReview,
  getUserProductReviews,
  getProductReviews,
  getAllProductReviews 
} = require("../controllers/productReviewController");
const {
  verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization,
} = require("../middleware/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, writeProductReview);

//UPDATE
router.put("/:id", verifyToken, updateProductReview);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteProductReview);

//GET ALL PRODUCT REVIEWS FOR A USER
router.get("/by/:userId", verifyTokenAndAuthorization, getUserProductReviews);

//GET ALL REVIEWS FOR A PRODUCT
router.get("/for/:productId", verifyTokenAndAuthorization, getProductReviews);

//GET ALL PRODUCT REVIEWS
router.get("/", verifyTokenAndAdmin, getAllProductReviews);

module.exports = router;
