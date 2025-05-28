// backend/src/utils/db.js
require('dotenv').config();
const { Pool } = require('pg');

//console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

/*console.log("Conectare la baza de date:", {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});*/


const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

/*pool.query('SELECT current_database()')
  .then(res => console.log('DB used by Node.js:', res.rows[0].current_database))
  .catch(err => console.error('Error checking DB:', err));
*/

module.exports = pool;
