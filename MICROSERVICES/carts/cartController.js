const Cart = require("./cartModel");

const welcomeToService = (req,res)=> {
  res.status(200).json("Welcome to carts service");
}

const addToCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.body.userId });
    if(cart){
      if(cart.products.every((p)=> p.productId== req.body.products[0].productId)){
        res.status(500).json("Product already present in your cart");
      }else{
        cart.products.push(...req.body.products);
        const updatedCart = await Cart.findByIdAndUpdate(
          cart.id,
          {
            $set: cart,
          },
          { new: true }
        );
        res.status(200).json(updatedCart);
      }
    }else{
      const newCart = new Cart(req.body);
      try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
      } catch (err) {
        res.status(500).json(err.message);
      }
    }
    
  }
const updateCart = async (req, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  
const deleteFromCart = async (req, res) => {
    const cart = await Cart.findById(req.params.id);
    if(cart){
      cart.delete()
      res.status(200).json("Cart has been deleted...");
    }else{
      res.status(500).json("Cart not found");
    }
  }
const getUserCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

const getAllUsersCart = async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

module.exports = { 
  welcomeToService, 
  addToCart, 
  updateCart, 
  deleteFromCart, 
  getUserCart, 
  getAllUsersCart 
}