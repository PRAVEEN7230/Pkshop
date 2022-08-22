const Order = require("../models/orderModel");

 const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);
    try {
      var savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
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
      ).populate("userId", "name email")
      .populate("products.productId", "title desc img categories size color price");
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
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
      const order = await Order.findById(req.params.id)
      .populate("userId", "-password")
      .populate("products.productId", !req.user.isAdmin&&"-stock");;
      if(!order){
        res.status(500).json("Order not found");
      }
      if(order.userId !== req.user.id){
        res.status(200).json(order);
      } else{
        res.status(500).json("This order not belongs to you");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  const getUserOrders = async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId })
      .populate("userId", "name email")
      .populate("products.productId", "title img size color price");
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "title price");
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
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
      res.status(500).json(err);
    }
  }

  module.exports = { createOrder, updateOrder, deleteOrder, getOrder, getUserOrders, getAllOrders, getIncome }