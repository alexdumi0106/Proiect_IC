// repositories/courtsRepository.js
const pool = require('../utils/db');

exports.fetchAllCourts = async () => {
  const result = await pool.query('SELECT * FROM courts');
  return result.rows;
};

exports.getCourtWithComplex = async (courtId) => {
    const result = await pool.query(
      `SELECT courts.id, courts.name, sports_complexes.name AS complex_name
       FROM courts
       JOIN sports_complexes ON courts.sports_complex_id = sports_complexes.id
       WHERE courts.id = $1`,
      [courtId]
    );
    return result.rows[0];
  };