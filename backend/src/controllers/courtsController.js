const pool = require('../db');


const getAllCourts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courts');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching courts:', error);
    res.status(500).json({ error: 'Server error fetching courts' });
  }
};

module.exports = {
  getAllCourts,
};