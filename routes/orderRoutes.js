const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.status(201).json(order);
});

router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ date: -1 });
  res.json(orders);
});

router.patch("/:id", async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { orderStatus: req.body.status },
    { new: true }
  );
  res.json(order);
});

module.exports = router;
