const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../controllers/verifyToken");
const { updateUser, deleteUser, findUser, getAllUsers, userStats, addUser } = require("../controllers/userController");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, addUser);

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, updateUser);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, findUser);

//GET ALL USER
router.get("/", verifyTokenAndAdmin, getAllUsers);

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, userStats);

module.exports = router;
