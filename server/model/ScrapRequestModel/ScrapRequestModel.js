const mongoose = require('mongoose');

const ScrapRequestSchema = new mongoose.Schema({
    vendorid : {
        type : String,
        required : true,
    },
    vendorname : {
        type : String,
        required : true,
    },
    userid : {
        type : String,
        required : true,
    },
    city : {
        type : String,
        required : true,
    },
    email:{
        type : String,
        required : true
    },
    address : {
        name : {
            type : String,
            required : true,
        },
        
        city : {
            type : String,
            required : true,
        },
        phone : {
            type : String,
            required : true,
        },
        addresslane : {
            type : String,
            required : true,
        },
        landmark : {
            type : String,
            required : true,
        },
        pincode : {
            type : String,
            required : true,
        }
    },
    scraptype : {
        required : true,
        type : String,
    },
    quantity : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true
    },
    status : {
        type : String,
        default : 'pending'
    },
    schedule:{
        type : Date,
        default : '',
    },
    paymentStatus:{
        type : String,
        default : 'pending'
    }
});

module.exports = mongoose.model("ScrapRequest",ScrapRequestSchema);