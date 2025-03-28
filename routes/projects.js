const express = require('express');
const router = express.Router();
const { validationRules, validate } = require("./validator");
const { isAuthenticated } = require('./authenticate');

const projectsController = require('../controllers/projects');

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getSingle);
router.post('/', isAuthenticated, validationRules()[1], validate, projectsController.createProject);
router.put('/:id', isAuthenticated, validationRules()[1], validate, projectsController.updateProject);
router.delete('/:id', isAuthenticated, projectsController.deleteProject);

module.exports = router;