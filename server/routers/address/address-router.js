const express = require('express');
const {addAddress,editAddress,deleteAddress,fetchAddress} = require( "../../controller/address/address-controller");

const router = express.Router();
router.post('/add-address',addAddress);
router.put('/edit-address/:userid/:addressid',editAddress);
router.get('/get-address/:userid',fetchAddress);
router.delete('/delete-address/:userid/:addressid',deleteAddress);

module.exports = router;