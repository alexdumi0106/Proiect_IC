const express = require('express');
const router = express.Router();
const sportsComplexesController = require('../controllers/sportsComplexesController');

router.post('/', sportsComplexesController.createSportsComplex);

module.exports = router;

router.put('/:id', sportsComplexesController.updateSportsComplex);
router.delete('/:id', sportsComplexesController.deleteSportsComplex);

