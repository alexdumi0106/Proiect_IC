require('dotenv').config();
const { Pool } = require('pg');

// Creăm o conexiune la baza de date folosind pool-ul
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// Testăm conexiunea la baza de date
const testConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');  // Executăm o interogare simplă
    console.log('Conexiune reușită:', res.rows[0]);
  } catch (err) {
    console.error('Conexiune eșuată:', err);
  }
};

testConnection();
