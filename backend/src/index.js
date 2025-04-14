const express = require('express');
const cors = require('cors');
const pool = require('./db'); // Importă conexiunea la baza de date


const app = express();
const PORT = 5000;  // Backend API will run on this port

app.use(cors());  // Enable CORS for all routes
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend-ul funcționează!');
});

// Adaugă această rută pentru test
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend merge perfect!' });
});


// GET endpoint to fetch all courts from PostgreSQL
app.get('/courts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courts');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching courts:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the backend server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
