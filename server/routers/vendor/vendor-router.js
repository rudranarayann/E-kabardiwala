const express = require('express');
const router = express.Router();
const {loginVendor,logoutVendor,registerVendor ,forgotPassword,resetPassword}  = require('../../controller/vendor/auth-vendor');
const {registrationVendor,updatePrice,fetchRegisteredCities,deleteCity,addCity} = require('../../controller/vendor/registration-controller')

router.post('/vendor-login',loginVendor);
router.post('/vendor-register',registerVendor);
router.post('/vendor-logout',logoutVendor);
router.post('/forgot-password',forgotPassword);
router.post('/reset-password/:token',resetPassword);
router.post('/registration',registrationVendor);
router.put('/updateprice/:vendorid/:city',updatePrice);
router.post('/addcity',addCity);
router.get('/fetchallcity/:vendorid',fetchRegisteredCities);
router.delete('/deletecity/:vendorid/:city',deleteCity);

module.exports = router;