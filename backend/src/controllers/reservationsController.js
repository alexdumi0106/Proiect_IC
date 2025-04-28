const reservationsService = require('../services/reservationsService');

exports.createReservation = async (req, res) => {
  try {
    const reservation = await reservationsService.createReservation(req.body);
    res.status(201).json(reservation);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message || 'Server Error' });
  }
};

