const express = require('express');
const router = express.Router();
const reservationsController = require('../controllers/reservationsController');

router.post('/', reservationsController.createReservation);
router.get('/confirm', reservationsController.confirmReservation);
router.get('/cancel/:token', reservationsController.cancelReservation);


module.exports = router;

