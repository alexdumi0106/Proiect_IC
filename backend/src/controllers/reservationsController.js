const reservationsService = require('../services/reservationsService');
const { sendReservationEmail } = require('../services/emailService');

const createReservation = async (req, res) => {
  try {
    const reservation = await reservationsService.createReservation(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Server Error' });
  }
};

const confirmReservation = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send('Token missing');
    }

    const confirmedReservation = await reservationsService.confirmReservation(token);

    if (!confirmedReservation) {
      return res.status(404).send('Invalid or expired token');
    }

    await sendReservationEmail(confirmedReservation.user_email, {
      sportsComplex: confirmedReservation.sportsComplex,
      courtName: confirmedReservation.court_name,
      date: new Date(confirmedReservation.start_time).toLocaleDateString(),
      time: `${new Date(confirmedReservation.start_time).toLocaleTimeString()} - ${new Date(confirmedReservation.end_time).toLocaleTimeString()}`,
      pin: confirmedReservation.pin,
      confirmation_token: confirmedReservation.confirmation_token
    });

    res.send('Rezervarea a fost confirmată cu succes! Verifică emailul pentru detalii.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Eroare server');
  }
};

const cancelReservation = async (req, res) => {
  try {
    const { token } = req.params;
    const result = await reservationsService.cancelReservation(token);

    if (result) {
      res.status(200).json({ message: 'Rezervarea a fost anulată cu succes.' });
    } else {
      res.status(404).json({ message: 'Rezervarea nu a fost găsită sau a fost deja ștearsă.' });
    }
  } catch (error) {
    console.error('Eroare la anularea rezervării:', error);
    res.status(500).json({ message: 'A apărut o eroare la anularea rezervării.' });
  }
};

module.exports = {
  createReservation,
  confirmReservation,
  cancelReservation
};
