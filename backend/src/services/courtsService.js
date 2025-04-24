// services/courtsService.js
const courtsRepository = require('../models/courtsModel');
const reservationsRepository = require('../models/reservationsModel');

exports.getAllCourts = async () => {
  return await courtsRepository.fetchAllCourts();
};

exports.getCourtDetails = async (courtId) => {
    const court = await courtsRepository.getCourtWithComplex(courtId);
    if (!court) throw new Error('Court not found');
    
    const reservations = await reservationsRepository.getReservationsByCourtId(courtId);
  
    return {
      court,
      reservations,
    };
  };