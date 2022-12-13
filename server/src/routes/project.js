const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllProjects, getProject, addProject } = require('../controllers/project_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', getProject);
router.post('/', addProject);
router.get('/', getAllProjects);

module.exports = router;