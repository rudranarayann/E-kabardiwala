const mongoose = require('mongoose');

const ScrapRequestSchema = new mongoose.Schema({
    vendorid : {
        type : String,
        required : true,
        unique : true
    },
    userid : {
        type : String,
        required : true,
        unique : true
    },
    city : {
        type : String,
        required : true,
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
    scrapType : {
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
    }
});

module.exports = mongoose.model("ScrapRequest",ScrapRequestSchema);