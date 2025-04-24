const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Always load env first

const app = express();
const PORT = process.env.PORT || 5000; // Use .env fallback if needed

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Routes
const courtsRoutes = require('./routes/courtsRoutes');
app.use('/api/courts', courtsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
