const express = require('express');
const cors = require('cors');  // Enable CORS to allow frontend to make requests

const app = express();
const PORT = 5000;  // Backend API will run on this port

require('dotenv').config();
app.use(cors());  // Enable CORS for all routes

const courtRoutes = require('./routes/courtsRoutes');

app.use(express.json());

app.use('/api/courts', courtRoutes);

// Start the backend server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
