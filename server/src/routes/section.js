const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllSections, getSection, addSection, deleteSection } = require('../controllers/section_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', getSection);
router.delete('/:id', deleteSection);
router.post('/', addSection);
router.get('/', getAllSections);

module.exports = router;