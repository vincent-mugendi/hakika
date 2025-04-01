const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

// Product Model
const ProductSchema = new mongoose.Schema({
    name: String,
    batch: String,
    qrData: String,
    scanCount: { type: Number, default: 0 }
});

const Product = mongoose.model("Product", ProductSchema);

// Endpoint to verify QR code
app.get("/api/verify", async (req, res) => {
    const { qr } = req.query;
    if (!qr) return res.status(400).json({ error: "QR code required" });

    const product = await Product.findOne({ qrData: qr });
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.scanCount += 1;
    await product.save();

    res.json({ product, isFake: product.scanCount > 3 });
});

app.listen(5000, () => console.log("Server running on port 5000"));
