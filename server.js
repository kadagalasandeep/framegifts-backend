const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


// 👇 make sure this path and filename are correct
const productRoutes = require("./productRoutes");


const app = express();
const PORT = process.env.PORT || 5000;


// Middlewares
app.use(cors({
  origin: '*', // Allow all origins for production
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());


// Test route
app.get("/", (req, res) => {
  res.send("API is running ✅");
});


// Products API routes
app.use("/api/products", productRoutes);


// Start server AFTER DB connects
async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);


    console.log("MongoDB connected ✅");


    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}


start();


