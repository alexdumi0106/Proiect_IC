const express = require('express');
const router = express.Router();
const sportsComplexesController = require('../controllers/sportsComplexesController');

router.post('/', sportsComplexesController.createSportsComplex);

module.exports = router;
