const Contact = require('../models/contactModel'); // Assuming you have a Contact model

// Function to handle saving a contact
const saveContact = async (req, res) => {
    console.log('Received POST request:', req.body);  // Log the incoming request
  
    const { name, email, message,mobile,whatsapp,currentLocation } = req.body;
  
    try {
      const newContact = new Contact({ name, email, message,mobile,whatsapp,currentLocation  });
      
      // Attempt to save the new contact to the database
      await newContact.save();
      console.log('Contact saved:', newContact);
  
      // Send a response with the saved contact
      res.status(201).json({
        message: 'Contact saved successfully!',
        contact: newContact,
      });
    } catch (error) {
      console.error('Error saving contact:', error);
      res.status(500).json({
        error: 'Failed to save contact',
        details: error.message,
      });
    }
  };
  

// Function to handle fetching all contacts
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetches all documents from the Contact collection
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contacts', details: error.message });
  }
};

module.exports = { saveContact, getContacts };
