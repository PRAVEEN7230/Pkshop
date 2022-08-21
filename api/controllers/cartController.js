const Cart = require("../models/cartModel");

const addToCart = async (req, res) => {
    const cart = await Cart.findOne({ userId: req.body.userId });
    if(cart){
      if(cart.products.every((p)=> p.productId== req.body.products[0].productId)){
        res.status(200).json("Product already present in your cart");
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
        res.status(500).json(err);
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
      ).populate("userId", "name email")
      .populate("products.productId", "title img price");
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
const deleteFromCart = async (req, res) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json("Cart has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
const getUserCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId })
      .populate("userId", "name email")
      .populate("products.productId", "title img price");
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }

const getAllUsersCart = async (req, res) => {
    try {
      const carts = await Cart.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

module.exports = { addToCart, updateCart, deleteFromCart, getUserCart, getAllUsersCart }