// models/reservationsModel.js
const pool = require('../utils/db'); // conexiunea la baza de date

// Caută rezervările existente pentru un teren
exports.getReservationsByCourtId = async (courtId) => {
  const query = 'SELECT * FROM reservations WHERE court_id = $1';
  const { rows } = await pool.query(query, [courtId]);
  return rows;
};

// Creează o rezervare nouă cu PIN și token de confirmare
exports.createReservation = async (courtId, userName, userEmail, startTime, endTime, confirmationToken) => {
  const pin = Math.floor(100000 + Math.random() * 900000).toString(); // PIN random de 6 cifre

  const query = `
    INSERT INTO reservations (court_id, user_name, user_email, start_time, end_time, pin, confirmation_token, confirmed)
    VALUES ($1, $2, $3, $4, $5, $6, $7, false)
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [
    courtId,
    userName,
    userEmail,
    startTime,
    endTime,
    pin,
    confirmationToken
  ]);

  return rows[0];
};

exports.confirmReservationByToken = async (token) => {
  const query = `
    UPDATE reservations
    SET confirmed = TRUE
    WHERE confirmation_token = $1 AND confirmed = FALSE
    RETURNING *;
  `;

  const { rows } = await pool.query(query, [token]);
  const reservation = rows[0];

  if (!reservation) return undefined;

  // Obține numele terenului asociat + complex sportiv
  const courtQuery = `
    SELECT courts.name AS court_name, sports_complexes.name AS complex_name
    FROM courts
    JOIN sports_complexes ON courts.sports_complex_id = sports_complexes.id
    WHERE courts.id = $1
  `;
  const courtResult = await pool.query(courtQuery, [reservation.court_id]);

  // reservation.court_name = courtResult.rows[0]?.name || 'teren necunoscut';
  reservation.court_name = courtResult.rows[0]?.court_name;
  reservation.sportsComplex = courtResult.rows[0]?.complex_name;
  
  return reservation;
};

// Anulează rezervarea pe baza reservation_token
exports.cancelReservationByToken = async (token) => {
  const query = `
    DELETE FROM reservations
    WHERE confirmation_token = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [token]);
  return result.rowCount > 0;
};




