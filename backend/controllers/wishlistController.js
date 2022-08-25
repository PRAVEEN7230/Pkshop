const Wishlist = require("../models/wishlistModel");

const addToWishlist = async (req, res) => {
    const wishlist = await Wishlist.findOne({ userId: req.body.userId });
    if(wishlist){
      if(wishlist.products.every((p)=> p.productId== req.body.products[0].productId)){
        res.status(500).json("Product already present in your wishlist");
      }else{
        wishlist.products.push(...req.body.products);
        const updatedWishlist = await Wishlist.findByIdAndUpdate(
          wishlist.id,
          {
            $set: wishlist,
          },
          { new: true }
        );
        res.status(200).json(updatedWishlist);
      }
    } else{
      const newWishlist = new Wishlist(req.body);
      try {
        const savedWishlist = await newWishlist.save();
        res.status(200).json(savedWishlist);
      } catch (err) {
        res.status(500).json(err.message);
      }
    }
  }
const updateWishlist = async (req, res) => {
    try {
      const updatedWishlist = await Wishlist.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      ).populate("userId", "name email")
      .populate("products.productId", "title desc img categories size color price");
      res.status(200).json(updatedWishlist);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  
const deleteFromWishlist = async (req, res) => {
    const wishlist = await Wishlist.findById(req.params.id);
    if(wishlist){
      wishlist.delete()
      res.status(200).json("Wishlist has been deleted...");
    }else{
      res.status(500).json("Wishlist not found");
    }
  }
const getUserWishlist = async (req, res) => {
    try {
      const cart = await Wishlist.findOne({ userId: req.params.userId })
      .populate("userId", "name email")
      .populate("products.productId", "title img size color price");
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

const getAllUsersWishlist = async (req, res) => {
    try {
      const carts = await Wishlist.find()
      .populate("userId", "name email")
      .populate("products.productId", "title price");
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

module.exports = { addToWishlist, updateWishlist, deleteFromWishlist, getUserWishlist, getAllUsersWishlist }