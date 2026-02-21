const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Add product
router.post("/", upload.single("image"), async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
    image: req.file ? `/uploads/${req.file.filename}` : "",
  });

  await product.save();
  res.json(product);
});

// Get products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Delete product
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

// Update product
router.put("/:id", upload.single("image"), async (req, res) => {
  const updatedData = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
  };

  if (req.file) {
    updatedData.image = `/uploads/${req.file.filename}`;
  }

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    updatedData,
    { new: true }
  );

  res.json(product);
});

module.exports = router;
