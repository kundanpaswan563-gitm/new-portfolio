                    const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./configue/Db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Routes (example)
// app.use("/api/contact", require("./router/Router"));

const Router = require("./router/Router");
app.use("/", Router);


app.use("/uploads", express.static("uploads"));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
