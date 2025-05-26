const { v4: uuidv4 } = require('uuid'); // npm install uuid
const { sendConfirmationEmail } = require('./emailService');

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

  const confirmation_token = uuidv4();

  const newReservation = await reservationsModel.createReservation(
    court_id, user_name, user_email, start_time, end_time, confirmation_token
  );

  await sendConfirmationEmail(user_email, {
    user_name,
    start_time,
    end_time,
    confirmation_token
  });

  return {
    message: "Confirm your reservation via the email link.",
    confirmation_token
  };
};

const reservationsModel = require('../models/reservationsModel');

exports.confirmReservation = async (token) => {
  // Apelează modelul care actualizează rezervarea cu tokenul primit
  const updatedReservation = await reservationsModel.confirmReservationByToken(token);

  return updatedReservation;
};



