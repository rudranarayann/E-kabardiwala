const express = require('express');
const router = express.Router();
const {loginVendor,logoutVendor,registerVendor}  = require('../../controller/vendor/auth-vendor');

router.post('/vendor-login',loginVendor);
router.post('/vendor-register',registerVendor);
router.post('/vendor-logout',logoutVendor);

module.exports = router;