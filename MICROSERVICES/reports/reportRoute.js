const { 
    welcomeToService,
    userReport,
    getSales
} = require("./reportController");
const { verifyTokenAndAdmin, } = require("./middleware/verifyToken");

const router = require("express").Router();

//WELCOME
router.get("/", welcomeToService);

//GET USER REPORT
router.get("/users", verifyTokenAndAdmin, userReport);

//GET MONTHLY SALES
router.get("/sales", verifyTokenAndAdmin, getSales);

module.exports = router;
