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
