const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./middleware/verifyToken");
const { welcomeToService, updateUser, deleteUser, findUser, getAllUsers, userStats, addUser } = require("./userController");

const router = require("express").Router();

//WELCOME
router.get("/", welcomeToService);

//CREATE
router.post("/", verifyTokenAndAdmin, addUser);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateUser);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, findUser);

//GET ALL USER
router.get("/all", verifyTokenAndAdmin, getAllUsers);

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, userStats);

module.exports = router;
