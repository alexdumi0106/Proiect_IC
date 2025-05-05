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
