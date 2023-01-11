const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllProjects, getProject, addProject, deleteProject, updateProject } = require('../controllers/project_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', getProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.post('/', addProject);
router.get('/', getAllProjects);

module.exports = router;