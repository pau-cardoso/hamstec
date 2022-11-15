const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllProducts, getProduct, addProduct } = require('../controllers/product_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', getProduct);
router.get('/', getAllProducts);
router.post('/', addProduct);

module.exports = router;