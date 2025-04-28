const reservationsModel = require('../models/reservationsModel');

exports.createReservation = async ({ court_id, user_name, user_email, start_time, end_time }) => {
  if (!court_id || !user_name || !user_email || !start_time || !end_time) {
    throw { status: 400, message: 'All fields are required.' };
  }

  const existingReservations = await reservationsModel.getReservationsByCourtId(court_id);

  const conflict = existingReservations.some(reservation => {
    const existingStart = new Date(reservation.start_time);
    const existingEnd = new Date(reservation.end_time);
    const newStart = new Date(start_time);
    const newEnd = new Date(end_time);

    return (newStart < existingEnd && newEnd > existingStart);
  });

  if (conflict) {
    throw { status: 409, message: 'Time slot already booked.' };
  }

  const newReservation = await reservationsModel.createReservation(court_id, user_name, user_email, start_time, end_time);
  return newReservation;
};

