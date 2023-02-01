const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllQuoteProducts, getQuoteProduct, getProductsByQuote, addQuoteProduct, getProductsInstalledByQuote, getProductCount, updateProduct, deleteProduct, deleteSection, getQuotesInformationByProject } = require('../controllers/quote_product_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', getQuoteProduct);
router.delete('/:id', deleteProduct);
router.get('/quote/:id_quote', getProductsByQuote);
router.get('/project/:id_project', getQuotesInformationByProject);
router.delete('/quote/:id_quote/delete-section', deleteSection);
router.get('/quote-installed/:id_quote', getProductsInstalledByQuote);
router.get('/count/:id_quote', getProductCount);
router.put('/:id', updateProduct);
router.post('/', addQuoteProduct);
router.get('/', getAllQuoteProducts);

module.exports = router;