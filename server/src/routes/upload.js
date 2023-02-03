const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { upload, uploadFile, getPDF } = require('../controllers/upload_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/pdf/:filename', getPDF);
router.post('/:quoteId', upload, uploadFile);

module.exports = router;