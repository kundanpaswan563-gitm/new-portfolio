


const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./configue/Db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ✅ CORS (FIXED)
app.use(cors({
  origin: "https://kundan-new-portfolio.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

// Middleware
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Routes
const Router = require("./router/Router");
app.use("/", Router);

// Static folder
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});