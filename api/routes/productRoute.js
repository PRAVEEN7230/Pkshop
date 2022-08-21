const { 
    addProduct, 
    deleteProduct, 
    updateProduct, 
    getAllProducts, 
    getProduct 
} = require("../controllers/productController");
const { verifyTokenAndAdmin, } = require("../middleware/verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyTokenAndAdmin, addProduct);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, updateProduct);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

//GET PRODUCT
router.get("/find/:id", getProduct);

//GET ALL PRODUCTS
router.get("/", getAllProducts);

module.exports = router;
