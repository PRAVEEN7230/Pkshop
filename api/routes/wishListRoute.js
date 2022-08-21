const { updateWishList, addToWishList, deleteFromWishList, getUserWishList, getAllUsersWishList } = require("../controllers/wishListController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, addToWishList);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateWishList);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteFromWishList);

//GET USER WISHLIST
router.get("/find/:userId", verifyTokenAndAuthorization, getUserWishList);

//GET ALL Users WISHLIST
router.get("/", verifyTokenAndAdmin, getAllUsersWishList);

module.exports = router;
