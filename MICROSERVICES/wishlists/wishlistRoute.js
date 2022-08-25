const { 
  welcomeToService,
  updateWishlist, 
  addToWishlist, 
  deleteFromWishlist, 
  getUserWishlist, 
  getAllUsersWishlist 
} = require("./wishlistController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./middleware/verifyToken");

const router = require("express").Router();

//WELCOME
router.get("/", welcomeToService);

//CREATE
router.post("/", verifyToken, addToWishlist);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateWishlist);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteFromWishlist);

//GET USER WISHLIST
router.get("/for/:userId", verifyTokenAndAuthorization, getUserWishlist);

//GET ALL Users WISHLIST
router.get("/all", verifyTokenAndAdmin, getAllUsersWishlist);

module.exports = router;
