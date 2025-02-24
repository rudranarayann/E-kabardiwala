const express = require('express');
const router = express.Router();
const {saveContact,getContacts}  = require('../../controller/contact/contact-controller');

router.post('/save-contact',saveContact);
router.get('/get-contacts',getContacts);

module.exports = router;