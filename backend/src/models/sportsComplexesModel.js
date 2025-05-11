const pool = require('../utils/db');

exports.insertSportsComplex = async (name, location, image_url, description) => {
  const result = await pool.query(
    `INSERT INTO sports_complexes (name, location, image_url, description)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [name, location, image_url, description]
  );
  return result.rows[0];
};

// Actualizează o bază sportivă
exports.updateSportsComplex = async (id, name, location, description, image_url) => {
  const result = await pool.query(
    `UPDATE sports_complexes 
     SET name = $1, location = $2, description = $3, image_url = $4 
     WHERE id = $5 
     RETURNING *`,
    [name, location, description, image_url, id]
  );
  return result.rows[0];
};

// Șterge o bază sportivă
exports.deleteSportsComplex = async (id) => {
  await pool.query('DELETE FROM sports_complexes WHERE id = $1', [id]);
};

