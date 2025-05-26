const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController');

router.post('/reservations', reservationsController.createReservation);
router.get('/confirm', reservationsController.confirmReservation);

module.exports = router;

