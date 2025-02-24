const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, 
    },
    email: {
      type: String,
      required: true,
    },
    mobileno: {
        type: String, 
        required: true,
    },
      subject: {
        type: String, 
        required: false, 
    },
    message: {
      type: String,
      required: true,
    },
    date : {
        type : Date,
        required : true,
        default : Date.now
    }
    // currentLocation: {
    //   type: String, 
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Contact', contactSchema);
