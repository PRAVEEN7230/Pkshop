const { 
    welcomeToService,
    addProduct, 
    deleteProduct, 
    updateProduct, 
    getAllProducts, 
    getProduct 
} = require("./productController");
const { verifyToken,verifyTokenAndAdmin, } = require("./middleware/verifyToken");

const router = require("express").Router();

//CREATE
router.get("/", welcomeToService);

//CREATE
router.post("/", verifyTokenAndAdmin, addProduct);

//UPDATE
router.put("/:id", verifyToken, updateProduct);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//GET PRODUCT
router.get("/find/:id", getProduct);

//GET ALL PRODUCTS
router.get("/all", getAllProducts);

module.exports = router;
