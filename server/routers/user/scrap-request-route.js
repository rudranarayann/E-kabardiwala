const { requestScrap,fetchAllRequestsForVendor,fetchAllRequestsByUser ,updateSchedule} = require ('../../controller/ScrapRequest/scrapRequestForm-controller')

const express = require('express');
const router = express.Router();

router.post('/request/:city/:userid/:vendorid',requestScrap)
router.get('/request/fetch/user/:userid',fetchAllRequestsByUser)
router.get('/request/fetch/vendor/:vendorid',fetchAllRequestsForVendor)
router.put('/request/schedule/:reqId',updateSchedule);

module.exports = router;

