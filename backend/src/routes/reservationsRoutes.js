const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController');

router.post('/reservations', reservationsController.createReservation);

module.exports = router;

