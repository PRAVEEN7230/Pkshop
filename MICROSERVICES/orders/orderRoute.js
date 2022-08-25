const { 
  welcomeToService,
  createOrder,
  updateOrder, 
  deleteOrder, 
  getOrder,
  getUserOrders, 
  getAllOrders, 
  getIncome 
} = require("./orderController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./middleware/verifyToken");

const router = require("express").Router();

//WELCOME
router.get("/", welcomeToService);

//CREATE
router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//GET ORDER DETAILS
router.get("/show/:id", verifyToken, getOrder);

//GET USER ORDERS
router.get("/by/:userId", verifyTokenAndAuthorization, getUserOrders);

//GET ALL ORDERS
router.get("/all", verifyTokenAndAdmin, getAllOrders);

//GET MONTHLY INCOME
router.get("/sales", verifyTokenAndAdmin, getIncome);

module.exports = router;
