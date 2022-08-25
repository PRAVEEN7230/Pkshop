const Order = require("./orderModel");
const axios = require('axios');
const emailAlert = require("./auto-email.js");

const welcomeToService = (req,res)=> {
  res.status(200).json("Welcome to orders service");
}

 const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    let lessStockProducts = [];
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
      for(const product of req.body.products){
        const response = await axios.get(`http://localhost:9000/products/find/${product.productId}`, req.headers);
        const stock = response.data.stock - product.quantity;
        if(stock <= process.env.ALERT_QUANTITY){
          lessStockProducts.push([product.title, stock]);
        }
        try {
          await axios.put(`http://localhost:9000/products/${product.productId}`, 
          {
            stock: stock,
          }, 
          {
            headers: { token: req.headers.token }
          });
        } catch (err) {
        res.status(500).json(err.message);
        return
        }
      }
      if(lessStockProducts.length>0){
        emailAlert(lessStockProducts);
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

const updateOrder = async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  const deleteOrder = async (req, res) => {
    const order = await Order.findById(req.params.id);
    if(order){
      order.delete()
      res.status(200).json("Order has been deleted...");
    }else{
      res.status(500).json("Order not found");
    }
  }

  const getOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id);
      if(!order){
        res.status(500).json("Order not found");
      }
      if(order.userId !== req.user.id){
        res.status(200).json(order);
      } else{
        res.status(500).json("This order not belongs to you");
      }
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  const getUserOrders = async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  const getIncome = async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
            ...(productId && {
              products: { $elemMatch: { productId } },
            }),
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  module.exports = { 
    welcomeToService,
    createOrder, 
    updateOrder, 
    deleteOrder, 
    getOrder, 
    getUserOrders, 
    getAllOrders, 
    getIncome 
  }