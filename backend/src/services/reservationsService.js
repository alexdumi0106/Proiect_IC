const db = require('../models/db'); // Conexiunea la baza de date

// 1. Verifică dacă există conflicte de timp pentru o rezervare
exports.checkTimeConflict = async (court_id, start_time, end_time) => {
  const query = `
    SELECT * FROM reservations
    WHERE court_id = $1
    AND (
      (start_time < $2 AND end_time > $2)  -- overlap la începutul intervalului
      OR
      (start_time < $3 AND end_time > $3)  -- overlap la sfârșitul intervalului
      OR
      (start_time >= $2 AND end_time <= $3) -- interval complet inclus în altul
    )
  `;
  
  const values = [court_id, start_time, end_time];
  const result = await db.query(query, values);

  return result.rows.length > 0;  // Dacă sunt rezervări care se suprapun
};

// 2. Creează o nouă rezervare
exports.createReservation = async (court_id, user_name, user_email, start_time, end_time) => {
  const query = `
    INSERT INTO reservations (court_id, user_name, user_email, start_time, end_time)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  
  const values = [court_id, user_name, user_email, start_time, end_time];
  const result = await db.query(query, values);

  return result.rows[0];  // Returnează rezervarea creată
};
