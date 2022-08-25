const { welcomeToService, register, login, logout } = require("./authController");
const { verifyToken, } = require("./middleware/verifyToken");
const router = require("express").Router();

//REGISTER
router.get("/", welcomeToService);

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

//LOGOUT
router.get("/logout", verifyToken, logout);

module.exports = router;
