const { 
  welcomeToService,
  updateCart, 
  addToCart, 
  deleteFromCart, 
  getUserCart, 
  getAllUsersCart 
} = require("./cartController");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./middleware/verifyToken");

const router = require("express").Router();

//WELCOME
router.get("/", welcomeToService);

//CREATE
router.post("/", verifyToken, addToCart);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateCart);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteFromCart);

//GET USER CART
router.get("/for/:userId", verifyTokenAndAuthorization, getUserCart);

//GET ALL Users CART
router.get("/all", verifyTokenAndAdmin, getAllUsersCart);

module.exports = router;
