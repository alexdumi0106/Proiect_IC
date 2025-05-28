const pool = require('./db');

async function deleteExpiredReservations() {
  try {
    const now = new Date();
    const twoMinutesAgo = new Date(now.getTime() - 2 * 60 * 1000);

    const result = await pool.query(
      `DELETE FROM public.reservations WHERE confirmed = false AND created_at < $1 RETURNING *`,
      [twoMinutesAgo]
    );

    if (result.rowCount > 0) {
      console.log(`⛔ ${result.rowCount} rezervări neconfirmate au fost șterse automat.`);
    }
  } catch (err) {
    console.error('Eroare la curățarea rezervărilor neconfirmate:', err);
  }
}

// 🔁 Rulează la fiecare 30 secunde (după un delay inițial de 3 secunde)
setTimeout(() => {
  deleteExpiredReservations(); // apel inițial
  setInterval(deleteExpiredReservations, 30000);
}, 3000); // delay inițial de 3 secunde

