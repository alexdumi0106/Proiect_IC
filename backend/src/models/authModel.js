const pool = require('../utils/db');

exports.getAdminByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM admins WHERE username = $1', [username]);
  return result.rows[0];
};
