const reservationsService = require('../services/reservationsService');

exports.createReservation = async (req, res) => {
  try {
    const reservation = await reservationsService.createReservation(req.body);
    await sendReservationEmail(reservation.email, {
      name: reservation.name,
      date: reservation.date,
      time: reservation.time,
      court: reservation.court_name, 
      pin: reservation.pin
    });
    res.status(201).json(reservation);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Server Error' });
  }
};

const { sendReservationEmail } = require('../services/emailService');

