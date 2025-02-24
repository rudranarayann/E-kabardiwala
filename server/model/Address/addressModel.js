const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    userid : String,
    name : String,
    address : String ,
    city : String,
    pincode : String,
    phone : String ,
    landmark : String ,
},{timestamps:true});

module.exports = mongoose.model('Address',AddressSchema);