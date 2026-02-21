const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: Number,
  address: {
    name: String,
    phone: String,
    addressLine: String,
    city: String,
    pincode: String,
  },
  paymentMethod: String,
  paymentStatus: {
    type: String,
    default: "Pending",
  },
  orderStatus: {
    type: String,
    default: "Processing",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);
