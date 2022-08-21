const WishList = require("../models/wishListModel");

const addToWishList = async (req, res) => {
    const wishList = await WishList.findOne({ userId: req.body.userId });
    if(wishList){
      console.log("Already exist wishlist...")
      if(wishList.products.every((p)=> p.productId== req.body.products[0].productId)){
        res.status(200).json("Product already present in your wishlist");
      }else{
        wishList.products.push(...req.body.products);
        const updatedWishList = await WishList.findByIdAndUpdate(
          wishList.id,
          {
            $set: wishList,
          },
          { new: true }
        );
        res.status(200).json(updatedWishList);
      }
    } else{
      const newWishList = new WishList(req.body);
      try {
        const savedWishList = await newWishList.save();
        res.status(200).json(savedWishList);
      } catch (err) {
        res.status(500).json(err);
      }
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