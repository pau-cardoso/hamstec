const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllQuoteProducts, getQuoteProduct, getProductsByQuote, addQuoteProduct, getProductsInstalledByQuote, getProductCount } = require('../controllers/quote_product_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', getQuoteProduct);
router.get('/quote/:id_quote', getProductsByQuote);
router.get('/quote-installed/:id_quote', getProductsInstalledByQuote);
router.get('/count/:id_quote', getProductCount);
router.post('/', addQuoteProduct);
router.get('/', getAllQuoteProducts);

module.exports = router;