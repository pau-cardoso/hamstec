const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllQuoteProducts, getQuoteProduct, getProductsByQuote, addQuoteProduct } = require('../controllers/quote_product_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', getQuoteProduct);
router.get('/quote/:id_quote', getProductsByQuote);
router.post('/', addQuoteProduct);
router.get('/', getAllQuoteProducts);

module.exports = router;