const Product = require("./productModel");
const { csv2json } =require("csvjson-csv2json");

const welcomeToService = (req,res) => {
  res.status(200).json("Welcome to products service");
}

const addProductsFromFile = async (req, res) => {
  try {
    if (!req.files || !req.files?.csvupload) throw Error("Invalid file");
    const json = csv2json(req.files.csvupload.data.toString("utf-8"));
    await Product.insertMany(json);
    res.status(200).json({ message: "Sucess", data: json });
  } catch (err) {
    res.status(400).json({ message: err?.message ?? "An error occurred" });
  }
}

const addProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }


  const getAllProducts = async (req, res) => {
    const keyword = req.query.search;
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
      if (keyword){
        products = await Product.find({
          $or: [
            { title: { $regex: req.query.search, $options: "i" } },
            { category: { $regex: req.query.search, $options: "i" }}
          ],
        });
      } else if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Product.find({ category: qCategory,});
      } else {
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  

const getProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

const updateProduct = async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product){
      product.delete()
      res.status(200).json("Product has been deleted...");
    }else{
      res.status(500).json("Product not found");
    }
  }


  module.exports = { 
    welcomeToService, 
    addProductsFromFile,
    getAllProducts, 
    addProduct, 
    getProduct, 
    updateProduct, 
    deleteProduct }