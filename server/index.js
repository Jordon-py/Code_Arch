// index.js - Main backend entry for Code Archive
require("dotenv").config(); // Loads .env variables

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

//  ------------------------------------------------------------------------------------->
// --------------------> 1. Middlewares: CORS and JSON body parsing
// ------------------------------------------------------------------------------------->

app.use(cors()); // Allow frontend to connect
app.use(express.json()); // Parse JSON payloads

//  --------------------------------------------------------------------->
// -------------------2. Connect to MongoDB with Mongoose
// ---------------------------------------------------------------------->

// 🧠 Connect to MongoDB without deprecated options (v4+ driver)
// What: Connects to MongoDB using Mongoose
// Why: Deprecated options like useNewUrlParser/useUnifiedTopology are no longer needed in v4+
// How: Use only the MongoDB URI and handle errors for authentication issues

const MONGO_URI = process.env.MONGO_URI; // Make sure this is set correctly in your .env

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    // Log error and explain possible causes
    console.error("❌ MongoDB connection error:", err);
    console.error(
      "🔎 Check your MONGO_URI, username, password, and database permissions."
    );
    process.exit(1); // Exit to avoid running app without DB
  });

//  ------------------------------------------------------------------------------------->
// ------------------------------------------------------>
// ---------------------> 3. Mount API routes (only snippets for now)

const snippetRoutes = require("./routes/snippets");
app.use("/api/snippets", snippetRoutes);

//  ------------------------------------------------------------------------------------->
// 4. Health check endpoint (optional)

app.get("/", (req, res) => res.send("🚀 Code Archive API is running!"));

//  ------------------------------------------------------------------------------------->
// --------------------->
// 5. Start the server

app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
