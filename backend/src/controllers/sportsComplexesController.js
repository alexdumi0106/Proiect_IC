const sportsComplexesService = require('../services/sportsComplexesService');

exports.createSportsComplex = async (req, res) => {
  try {
    const { name, location, image_url, description } = req.body;
    const newComplex = await sportsComplexesService.createSportsComplex(name, location, image_url, description);
    res.status(201).json(newComplex);
  } catch (error) {
    console.error('Error creating sports complex:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
