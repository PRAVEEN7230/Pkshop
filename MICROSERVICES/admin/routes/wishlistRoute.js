const { updateWishlist, addToWishlist, deleteFromWishlist, getUserWishlist, getAllUsersWishlist } = require("../controllers/wishlistController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, addToWishlist);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateWishlist);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteFromWishlist);

//GET USER WISHLIST
router.get("/for/:userId", verifyTokenAndAuthorization, getUserWishlist);

//GET ALL Users WISHLIST
router.get("/", verifyTokenAndAdmin, getAllUsersWishlist);

module.exports = router;
