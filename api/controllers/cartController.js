const Cart = require("../models/cartModel");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
    req.body.userId = mongoose.Types.ObjectId(req.body.userId);
    req.body.products.productId = mongoose.Types.ObjectId(req.body.products.productId);
    const newCart = new Cart(req.body);
    try {
      const savedCart = await newCart.save()
      .populate("userId", "name email")
      .populate("products.productId", "title img price");
      res.status(200).json(savedCart);
    } catch (err) {
      res.status(500).json(err);
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
      .populate("products.productId", "title img price");;
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