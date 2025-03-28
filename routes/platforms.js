const express = require('express');
const router = express.Router();
const { validationRules, validate } = require("./validator");
const { isAuthenticated } = require('./authenticate');

const platformController = require('../controllers/platform');
router.get('/', platformController.getAllPlatforms);
router.get('/:id', platformController.getSinglePlatform);
router.post('/', isAuthenticated, validationRules()[0], validate, platformController.createPlatform);
router.put('/:id', isAuthenticated, validationRules()[0], validate, platformController.updatePlatform);
router.delete('/:id', isAuthenticated, platformController.deletePlatform);

module.exports = router;