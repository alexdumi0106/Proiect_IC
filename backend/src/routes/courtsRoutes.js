const express = require('express');
const router = express.Router();
const { getAllCourts } = require('../controllers/courtsController');

router.get('/', getAllCourts);

module.exports = router;
