const { processPayment } = require("../controllers/checkoutController");
const { verifyToken } = require("../middleware/verifyToken");
const router = require("express").Router();

//PROCESS PAYMENT
router.post("/payment", verifyToken, processPayment);

module.exports = router;