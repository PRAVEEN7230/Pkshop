const { createOrder, updateOrder, deleteOrder, getUserOrders, getAllOrders, getIncome } = require("../controllers/orderController");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, createOrder);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateOrder);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteOrder);

//GET USER ORDERS
router.get("/find/:userId", verifyTokenAndAuthorization, getUserOrders);

//GET ALL ORDERS
router.get("/", verifyTokenAndAdmin, getAllOrders);

//GET MONTHLY INCOME
router.get("/income", verifyTokenAndAdmin, getIncome);

module.exports = router;
