// Quick seed script to add sample products
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/Product");

const sampleProducts = [
    // Photo Frames
    { name: "Classic Wooden Frame", price: 599, category: "Photo Frames", desc: "Beautiful handcrafted wooden frame, perfect for family photos", image: "" },
    { name: "Modern Metal Frame", price: 799, category: "Photo Frames", desc: "Sleek aluminum frame with a contemporary look", image: "" },
    { name: "Collage Photo Frame", price: 1299, category: "Photo Frames", desc: "Display 6 photos in one beautiful collage frame", image: "" },
    { name: "Vintage Brass Frame", price: 999, category: "Photo Frames", desc: "Antique-style brass frame for a classic touch", image: "" },

    // Photo Portraits
    { name: "Premium Oil Portrait", price: 2499, category: "Photo Portraits", desc: "Custom oil painting portrait from your photo", image: "" },
    { name: "Pencil Sketch Portrait", price: 999, category: "Photo Portraits", desc: "Hand-drawn pencil sketch from your favorite photo", image: "" },
    { name: "Digital Art Print", price: 699, category: "Photo Portraits", desc: "Modern digital art style portrait", image: "" },
    { name: "Watercolor Portrait", price: 1499, category: "Photo Portraits", desc: "Elegant watercolor painting from your photo", image: "" },

    // Gift Hampers
    { name: "Birthday Gift Hamper", price: 1299, category: "Gift Hampers", desc: "Curated birthday gift box with chocolates and goodies", image: "" },
    { name: "Anniversary Hamper", price: 1999, category: "Gift Hampers", desc: "Romantic gift set for couples", image: "" },
    { name: "Festival Gift Box", price: 1499, category: "Gift Hampers", desc: "Traditional festive hamper with sweets and dry fruits", image: "" },
    { name: "Corporate Gift Set", price: 2499, category: "Gift Hampers", desc: "Premium gift set for business partners", image: "" },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        // Clear existing products
        await Product.deleteMany({});
        console.log("Cleared existing products");

        // Add new products
        const result = await Product.insertMany(sampleProducts);
        console.log(`Added ${result.length} products!`);

        mongoose.connection.close();
        console.log("Done!");
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

seed();
