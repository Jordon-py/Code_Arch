// index.js - Main backend entry for Code Archive
require('dotenv').config();               // Loads .env variables

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

//  ------------------------------------------------------------------------------------->
// --------------------> 1. Middlewares: CORS and JSON body parsing
// ------------------------------------------------------------------------------------->


app.use(cors());                          // Allow frontend to connect
app.use(express.json());                  // Parse JSON payloads


//  --------------------------------------------------------------------->
// -------------------2. Connect to MongoDB with Mongoose
// ---------------------------------------------------------------------->


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});



//  ------------------------------------------------------------------------------------->
// ------------------------------------------------------>
// ---------------------> 3. Mount API routes (only snippets for now)

const snippetRoutes = require('./routes/snippets');
app.use('/api/snippets', snippetRoutes)

//  ------------------------------------------------------------------------------------->
// 4. Health check endpoint (optional)

app.get('/', (req, res) => res.send('🚀 Code Archive API is running!'));

//  ------------------------------------------------------------------------------------->
// ---------------------> 
// 5. Start the server

app.listen(PORT, () => {
  console.log(`🚀 Backend server running at http://localhost:${PORT}`);
});
