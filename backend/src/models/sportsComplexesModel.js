const pool = require('../utils/db');

exports.insertSportsComplex = async (name, location, image_url) => {
  const result = await pool.query(
    `INSERT INTO sports_complexes (name, location, image_url)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, location, image_url]
  );
  return result.rows[0];
};
