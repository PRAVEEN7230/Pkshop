const WishList = require("../models/wishListModel");
const mongoose = require("mongoose");

const addToWishList = async (req, res) => {
    req.body.userId = mongoose.Types.ObjectId(req.body.userId);
    req.body.products.productId = mongoose.Types.ObjectId(req.body.products.productId);
    const newWishList = new WishList(req.body);
    try {
      const savedWishList = await newWishList.save()
      .populate("userId", "name email")
      .populate("products.productId", "title desc img categories size color price");
      res.status(200).json(savedWishList);
    } catch (err) {
      res.status(500).json(err);
    }
  }
const updateWishList = async (req, res) => {
    try {
      const updatedWishList = await WishList.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      ).populate("userId", "name email")
      .populate("products.productId", "title desc img categories size color price");
      res.status(200).json(updatedWishList);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
const deleteFromWishList = async (req, res) => {
    try {
      await WishList.findByIdAndDelete(req.params.id);
      res.status(200).json("WishList has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }
const getUserWishList = async (req, res) => {
    try {
      const cart = await WishList.findOne({ userId: req.params.userId })
      .populate("userId", "name email")
      .populate("products.productId", "title desc img categories size color price");
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  }

const getAllUsersWishList = async (req, res) => {
    try {
      const carts = await WishList.find()
      .populate("userId", "name email")
      .populate("products.productId", "title desc img categories size color price");
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err);
    }
  }

module.exports = { addToWishList, updateWishList, deleteFromWishList, getUserWishList, getAllUsersWishList }