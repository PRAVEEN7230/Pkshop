const { register, login, logout } = require("./authController");
const { verifyToken, } = require("../middleware/verifyToken");
const router = require("express").Router();

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

//LOGOUT
router.post("/logout", verifyToken, logout);

module.exports = router;
