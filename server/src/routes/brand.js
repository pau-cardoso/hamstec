const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllBrands, getBrand, addBrand } = require('../controllers/brand_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', getBrand);
router.post('/', addBrand);
router.get('/', getAllBrands);

module.exports = router;