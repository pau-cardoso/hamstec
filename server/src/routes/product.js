const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/product_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/', getAllProducts);
router.post('/', addProduct);

module.exports = router;