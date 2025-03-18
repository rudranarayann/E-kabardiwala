const { requestScrap } = require ('../../controller/ScrapRequest/scrapRequestForm-controller')

const express = require('express');
const router = express.Router();

router.post('/request/:city/:userid/:vendorid',requestScrap)

module.exports = router;