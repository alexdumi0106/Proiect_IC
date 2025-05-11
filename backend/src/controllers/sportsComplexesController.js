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

exports.updateSportsComplex = async (req, res) => {
  try {
    const updated = await sportsComplexesService.updateSportsComplex(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update sports complex' });
  }
};

exports.deleteSportsComplex = async (req, res) => {
  try {
    await sportsComplexesService.deleteSportsComplex(req.params.id);
    res.json({ message: 'Sports complex deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete sports complex' });
  }
};
