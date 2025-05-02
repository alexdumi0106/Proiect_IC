// repositories/courtsRepository.js
const pool = require('../utils/db');

exports.fetchAllCourts = async () => {
  const result = await pool.query('SELECT * FROM courts');
  return result.rows;
};

exports.getCourtWithComplex = async (courtId) => {
    const result = await pool.query(
      `SELECT
        courts.id,
        courts.name,
        courts.description,
        courts.image_url,
        sports_complexes.name AS complex_name,
        sports_complexes.location,
        sports_complexes.image_url AS complex_image 
      FROM courts
       JOIN sports_complexes ON courts.sports_complex_id = sports_complexes.id
       WHERE courts.id = $1`,
      [courtId]
    );
    return result.rows[0];
  };

  exports.getAllCourtsWithComplex = async () => {
    const result = await pool.query(`
      SELECT 
        courts.id,
        courts.name,
        courts.description,
        courts.image_url,
        sports_complexes.name AS complex_name,
        sports_complexes.location,
        sports_complexes.image_url AS complex_image
      FROM courts
      JOIN sports_complexes ON courts.sports_complex_id = sports_complexes.id
    `);
    return result.rows;
  };
  
  exports.insertCourt = async (name, description, image_url, sports_complex_id) => {
    const result = await pool.query(
      `INSERT INTO courts (name, description, image_url, sports_complex_id)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, description, image_url, sports_complex_id]
    );
    return result.rows[0];
  };