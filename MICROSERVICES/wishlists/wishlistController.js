const Wishlist = require("./wishlistModel");

const welcomeToService = (req,res)=> {
  res.status(200).json("Welcome to wishlists service");
}

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
      );
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
      const cart = await Wishlist.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

const getAllUsersWishlist = async (req, res) => {
    try {
      const carts = await Wishlist.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

module.exports = { 
  welcomeToService,
  addToWishlist, 
  updateWishlist, 
  deleteFromWishlist, 
  getUserWishlist, 
  getAllUsersWishlist 
}