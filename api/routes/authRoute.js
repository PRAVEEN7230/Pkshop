const { register, login } = require("../controllers/authController");

const router = require("express").Router();

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

// //LOGOUT

// router.post("/logout", async (res) => {
//   try {
//     user = null;
//     res.status(200).json("user logged out");
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
