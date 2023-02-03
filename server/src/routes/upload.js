const express = require('express');
const router = express.Router();
const { upload, uploadFile } = require('../controllers/upload_controller');

router.post('/', upload, uploadFile);

module.exports = router;