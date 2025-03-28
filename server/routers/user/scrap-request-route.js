const { requestScrap,fetchAllRequestsForVendor,fetchAllRequestsByUser } = require ('../../controller/ScrapRequest/scrapRequestForm-controller')

const express = require('express');
const router = express.Router();

router.post('/request/:city/:userid/:vendorid',requestScrap)
router.get('/request/fetch/:userid',fetchAllRequestsByUser)
router.get('/request/fetch/vendor/:vendorid',fetchAllRequestsForVendor)

module.exports = router;

