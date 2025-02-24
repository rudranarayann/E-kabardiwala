const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Fixed typo: 'require' to 'required'
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    mobile: {
      type: String, // Use String to accommodate different formats like country codes
      required: true,
    },
    subject: {
      type: String, // Use String to handle WhatsApp numbers with country codes
      required: false, // Optional if some users don't provide it
    },
    currentLocation: {
      type: String, // Storing location as a string (can be updated to GeoJSON if needed)
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Contact', contactSchema);
