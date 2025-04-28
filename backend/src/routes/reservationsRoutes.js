const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController');

// POST /api/reservations
router.post('/', reservationsController.createReservation);

module.exports = router;
