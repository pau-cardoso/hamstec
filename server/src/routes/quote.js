const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllQuotes, getQuote, getQuoteByProject } = require('../controllers/quote_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', getQuote);
router.get('/project/:project_id', getQuoteByProject);
router.get('/', getAllQuotes);

module.exports = router;