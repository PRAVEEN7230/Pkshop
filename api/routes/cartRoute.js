const { updateCart, addToCart, deleteFromCart, getUserCart } = require("../controllers/cartController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, addToCart);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateCart);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteFromCart);

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);

//GET ALL Users CART
router.get("/", verifyTokenAndAdmin, deleteFromCart);

module.exports = router;
