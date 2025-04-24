// routes/courtsRoutes.js
const express = require('express');
const router = express.Router();
const courtsController = require('../controllers/courtsController');

router.get('/', courtsController.getAllCourts);
router.get('/:id', courtsController.getCourtById );

module.exports = router;
