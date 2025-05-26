const reservationsService = require('../services/reservationsService');

exports.createReservation = async (req, res) => {
  try {
    const reservation = await reservationsService.createReservation(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Server Error' });
  }
};

const reservationsService = require('../services/reservationsService');

exports.confirmReservation = async (req, res) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send('Token missing');
    }

    const confirmedReservation = await reservationsService.confirmReservation(token);

    if (!confirmedReservation) {
      return res.status(404).send('Invalid or expired token');
    }

    // Trimite emailul final cu PIN-ul
    await sendReservationEmail(confirmedReservation.user_email, {
      courtName: confirmedReservation.court_name, // ai grijă ca acest câmp să existe
      date: new Date(confirmedReservation.start_time).toLocaleDateString(),
      time: `${new Date(confirmedReservation.start_time).toLocaleTimeString()} - ${new Date(confirmedReservation.end_time).toLocaleTimeString()}`,
      pin: confirmedReservation.pin
    });

    res.send('Rezervarea a fost confirmată cu succes! Verifică emailul pentru detalii.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Eroare server');
  }
};

const { sendReservationEmail } = require('../services/emailService');


