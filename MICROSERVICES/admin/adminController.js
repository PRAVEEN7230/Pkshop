const User = require("../models/userModel");
const bcrypt = require("bcryptjs")

const addUser = async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if(user){
    res.status(500).json("User already Exists with these details");
  }
  else{
    const salt = await bcrypt.genSalt(10)
    const { password, ...others } = req.body;
    const newUser = new User({
      password: await bcrypt.hash(req.body.password, salt),
      ...others
    });

    try {
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
}

const getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

const findUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

const updateUser = async (req, res) => {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
  
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(user){
      user.delete()
      res.status(200).json("User has been deleted...");
    }else{
      res.status(500).json("User not found");
    }
  }

  const userStats = async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  module.exports = { addUser, getAllUsers, findUser, updateUser, deleteUser, userStats }