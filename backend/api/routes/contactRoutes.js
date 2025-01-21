const express = require('express');
const { saveContact, getContacts } = require('../controllers/contactController');

const router = express.Router();

// POST route for saving a contact
router.post('/contacts', saveContact);

// GET route for fetching all contacts
router.get('/contacts', getContacts);

module.exports = router;
