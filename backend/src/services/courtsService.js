// services/courtsService.js
const courtsRepository = require('../models/courtsModel');
const reservationsRepository = require('../models/reservationsModel');

exports.getAllCourts = async () => {
  return await courtsRepository.getAllCourtsWithComplex(); //.fetchAllCourts();
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

exports.createCourt = async (name, description, image_url, sports_complex_id) => {
  return await courtsRepository.insertCourt(name, description, image_url, sports_complex_id);
};

exports.updateCourt = async (id, data) => {
  return await courtsRepository.updateCourt(
    id,
    data.name,
    data.description,
    data.image_url,
    data.sports_complex_id
  );
};

exports.deleteCourt = async (id) => {
  await courtsRepository.deleteCourt(id);
};
  