const express = require('express');
const cors = require('cors');  // Enable CORS to allow frontend to make requests

const app = express();
const PORT = 5000;  // Backend API will run on this port

app.use(cors());  // Enable CORS for all routes

// Example court data
const courts = [
  { id: 1, name: 'Teren1', description: 'Teren central', location: 'Baza Electrica' },
  { id: 2, name: 'Teren2', description: 'Teren secundar', location: 'Baza Electrica'  }
];

// Root endpoint for checking backend status
app.get('/', (req, res) => {
  res.send('Backend API is running!');  // Simple message for the root URL
});

// GET endpoint to fetch all courts
app.get('/courts', (req, res) => {
  res.json(courts);  // Return courts data in JSON format
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
