const sportsComplexesModel = require('../models/sportsComplexesModel');

exports.createSportsComplex = async (name, location, image_url, description) => {
  return await sportsComplexesModel.insertSportsComplex(name, location, image_url, description);
};

const sportsComplexesRepository = require('../models/sportsComplexesModel');

exports.updateSportsComplex = async (id, data) => {
  const { name, location, description, image_url } = data;
  return await sportsComplexesRepository.updateSportsComplex(id, name, location, description, image_url);
};

exports.deleteSportsComplex = async (id) => {
  await sportsComplexesRepository.deleteSportsComplex(id);
};
