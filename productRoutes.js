const express = require("express");
const Product = require("./Product");


const router = express.Router();


// GET /api/products -> list all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// GET /api/products/:id -> get single product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// POST /api/products -> create new product
router.post("/", async (req, res) => {
  try {
    const { name, price, desc, image, category } = req.body;


    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }


    const product = new Product({
      name,
      price: Number(price),
      desc: desc || "",
      image: image || "",
      category: category || "General",
    });


    const saved = await product.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// PUT /api/products/:id -> update product
router.put("/:id", async (req, res) => {
  try {
    const { name, price, desc, image, category } = req.body;


    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price: Number(price),
        desc,
        image,
        category,
      },
      { new: true }
    );


    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }


    res.json(product);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// DELETE /api/products/:id -> delete product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);


    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }


    res.json({ message: "Product deleted successfully", product });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;


