// models/reservationsModel.js
const pool = require('../utils/db');

exports.getReservationsByCourtId = async (courtId) => {
    const result = await pool.query(
      `SELECT start_time, end_time FROM reservations WHERE court_id = $1`,
      [courtId]
    );
    return result.rows;
  };