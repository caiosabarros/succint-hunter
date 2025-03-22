const express = require('express');
const router = express.Router();
const { validationRules, validate } = require("./validator");

const projectsController = require('../controllers/projects');

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getSingle);
router.post('/', validationRules()[1], validate, projectsController.createProject);
router.put('/:id', validationRules()[1], validate, projectsController.updateProject);
router.delete('/:id', projectsController.deleteProject);

module.exports = router;