const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

const register = async (req, res) => {
    const user = await User.findOne({
      $or: [{ username: req.body.username},
        {email: req.body.email,}
      ]});
    if(user){
      res.status(201).json("User already registered");
    }
    else{
      const salt = await bcrypt.genSalt(10)
      const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, salt),
      });
    
      try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).json(err.message);
      } 
    }
  }

const login = async (req, res) => {
    let user;
    user = await User.findOne({ username: req.body.username });

    if(user){
      bcrypt.compare(req.body.password, user.password, function (err, sucess) {
        if (err) {
          res.status(500).json(err.message);
        } else if (!sucess) {
          res.status(401).json("Invalid Password!");
        } else {
            //Login sucess
            const accessToken = jwt.sign(
              {
                id: user._id,
                isAdmin: user.isAdmin,
              },
              process.env.JWT_SEC,
              {expiresIn:"1d"}
            );
            const { password, ...others } = user._doc;
            res.status(200).json({...others, accessToken});
        }
      })
    } else{
      res.status(401).json("User not found!");
    }
  }

  const logout = (req, res) => {
    try{
        req.headers.token = "";
        res.status(200).json("User logged out sucessfully");
    }catch(err){
        res.status(500).json(err.message);
    }
    
  }

module.exports = { register, login, logout }