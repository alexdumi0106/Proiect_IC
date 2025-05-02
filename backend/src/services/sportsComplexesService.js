const sportsComplexesModel = require('../models/sportsComplexesModel');

exports.createSportsComplex = async (name, location, image_url) => {
  return await sportsComplexesModel.insertSportsComplex(name, location, image_url);
};
