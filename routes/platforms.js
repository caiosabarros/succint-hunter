const express = require('express');
const router = express.Router();
const { validationRules, validate } = require("./validator");

const platformController = require('../controllers/platform');

router.get('/', platformController.getAllPlatforms);
router.get('/:id', platformController.getSinglePlatform);
router.post('/', validationRules()[0], validate, platformController.createPlatform);
router.put('/:id', validationRules()[0], validate, platformController.updatePlatform);
router.delete('/:id', platformController.deletePlatform);

module.exports = router;