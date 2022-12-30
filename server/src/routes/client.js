const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { getAllClients, getClient, addClient, deleteClient } = require('../controllers/client_controller');

router.use(bodyParser.urlencoded({ extended: false }));

router.get('/:id', getClient);
router.delete('/:id', deleteClient);
router.post('/', addClient);
router.get('/', getAllClients);

module.exports = router;