const pool = require('../db');

const getAllCourts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courts');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching courts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { getAllCourts };
