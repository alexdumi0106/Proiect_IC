const express = require('express');
const router = express.Router();
const { getAllCourts } = require('../controllers/courtsController');

// Ruta pentru obținerea tuturor terenurilor
router.get('/', getAllCourts);

module.exports = router;
