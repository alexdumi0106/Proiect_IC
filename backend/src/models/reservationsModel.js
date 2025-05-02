// models/reservationsModel.js
const pool = require('../utils/db'); // conexiunea la baza de date

// Caută rezervările existente pentru un teren
exports.getReservationsByCourtId = async (courtId) => {
  const query = 'SELECT * FROM reservations WHERE court_id = $1';
  const { rows } = await pool.query(query, [courtId]);
  return rows;
};

// Creează o rezervare nouă cu PIN
exports.createReservation = async (courtId, userName, userEmail, startTime, endTime) => {
  const pin = Math.floor(100000 + Math.random() * 900000).toString(); // PIN random de 6 cifre

  const query = `
    INSERT INTO reservations (court_id, user_name, user_email, start_time, end_time, pin)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    courtId,
    userName,
    userEmail,
    startTime,
    endTime,
    pin
  ]);

  return rows[0];
};
