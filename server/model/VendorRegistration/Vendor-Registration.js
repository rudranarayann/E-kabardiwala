

const mongoose = require('mongoose');
const vendorRegistrationSchema = new mongoose.Schema({
    vendorid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Vendor',
        required : true,
    },
    vendorname : {
        type : String,
        required : true
    },
    location : {
        type : String ,
        required : true,
    },
    prices : [
        {
            city : {
                type : String,
                required : true,
            },
            plastic: { type: Number, required: true },
            glass: { type: Number, required: true },
            metal: { type: Number, required: true },
            paper: { type: Number, required: true }
        }
    ],
});
module.exports = mongoose.model('VendorRegistration',vendorRegistrationSchema);