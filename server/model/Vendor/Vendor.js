const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    companyname : {
        type : String,
        required : true,
        unique : true,
    },
    role : {
        type : String ,
        default : 'vendor',
    },
    resetToken: {
        type : String,
    },
    resetTokenExpire:{
        type : Date
    }
})

module.exports = mongoose.model('VendorAuth',vendorSchema);