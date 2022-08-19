const { processPayment } = require("../controllers/checkoutController");
const { verifyToken } = require("../controllers/verifyToken");
const router = require("express").Router();

//PROCESS PAYMENT
router.post("/payment", verifyToken, processPayment);

module.exports = router;