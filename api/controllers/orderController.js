const mongoose = require("mongoose");
const Order = require("../models/orderModel");

 const createOrder = async (req, res) => {
    req.body.userId = mongoose.Types.ObjectId(req.body.userId);
    req.body.products.productId = mongoose.Types.ObjectId(req.body.products.productId);
    const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save()
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
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  }

  const getUserOrders = async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId })
      .populate("userId", "name email")
      .populate("products.productId", "title desc img categories size color price");
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  const getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find()
      .populate("userId", "name email")
      .populate("products.productId", "title desc img categories size color price");
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

  module.exports = { createOrder, updateOrder, deleteOrder, getUserOrders, getAllOrders, getIncome }