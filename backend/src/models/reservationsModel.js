// models/reservationsModel.js
const pool = require('../utils/db'); // conexiunea la baza de date

// Caută rezervările existente pentru un teren
exports.getReservationsByCourtId = async (courtId) => {
  const query = 'SELECT * FROM reservations WHERE court_id = $1';
  const { rows } = await pool.query(query, [courtId]);
  return rows;
};

// Creează o rezervare nouă
exports.createReservation = async (courtId, userName, userEmail, startTime, endTime) => {
  const query = `
    INSERT INTO reservations (court_id, user_name, user_email, start_time, end_time)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const { rows } = await pool.query(query, [courtId, userName, userEmail, startTime, endTime]);
  return rows[0];
};
