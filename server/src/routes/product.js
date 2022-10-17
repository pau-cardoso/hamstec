const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllProducts, getProduct } = require('../controllers/product_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', getProduct);
router.get('/', getAllProducts);

module.exports = router;