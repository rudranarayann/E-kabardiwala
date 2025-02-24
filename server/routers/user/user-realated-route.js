const express = require('express');
const{fetchCityPrice} = require('../../controller/user/user-related-controller')
const router = express.Router();
router.get('/:city',fetchCityPrice);

module.exports = router;