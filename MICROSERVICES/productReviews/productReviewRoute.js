const { 
  welcomeToService,
  updateProductReview,
  writeProductReview, 
  deleteProductReview,
  getUserProductReviews,
  getProductReviews,
  getAllProductReviews 
} = require("./productReviewController");
const {
  verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization,
} = require("./middleware/verifyToken");

const router = require("express").Router();

//WELCOME
router.get("/", welcomeToService);

//CREATE
router.post("/write", verifyToken, writeProductReview);

//UPDATE
router.put("/update/:id", verifyToken, updateProductReview);

//DELETE
router.delete("/delete/:id", verifyTokenAndAuthorization, deleteProductReview);

//GET ALL PRODUCT REVIEWS FOR A USER
router.get("/by/:userId", verifyTokenAndAuthorization, getUserProductReviews);

//GET ALL REVIEWS FOR A PRODUCT
router.get("/for/:productId", verifyTokenAndAuthorization, getProductReviews);

//GET ALL PRODUCT REVIEWS
router.get("/all", verifyTokenAndAdmin, getAllProductReviews);

module.exports = router;
