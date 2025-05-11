// controllers/courtsController.js
const courtsService = require('../services/courtsService');

exports.getAllCourts = async (req, res) => {
  try {
    const courts = await courtsService.getAllCourts();
    res.json(courts);
  } catch (error) {
    console.error('Error in getAllCourts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getCourtById = async (req, res) => {
  try {
    const courtData = await courtsService.getCourtDetails(req.params.id);
    res.json(courtData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.createCourt = async (req, res) => {
  try {
    const { name, description, image_url, sports_complex_id } = req.body;
    const newCourt = await courtsService.createCourt(name, description, image_url, sports_complex_id);
    res.status(201).json(newCourt);
  } catch (error) {
    console.error('Error creating court:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateCourt = async (req, res) => {
  try {
    const updatedCourt = await courtsService.updateCourt(req.params.id, req.body);
    res.json(updatedCourt);
  } catch (error) {
    console.error('Error updating court:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteCourt = async (req, res) => {
  try {
    await courtsService.deleteCourt(req.params.id);
    res.status(204).send(); // No Content
  } catch (error) {
    console.error('Error deleting court:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

