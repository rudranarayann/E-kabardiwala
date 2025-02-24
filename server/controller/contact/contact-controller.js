const Contact = require('../../model/Contact/contactModel')


const saveContact = async (req, res) => {
    const { name, email, message, mobileno, subject } = req.body;

    try {

        if (!name || !email || !message || !mobileno || !subject) {
            return res.josn({
                success: false,
                message: 'Please fill all field...'
            })
        }

        const newContact = new Contact({ name, email, message, mobileno, subject, });

        await newContact.save();
        console.log('Contact saved:', newContact);

        res.status(201).json({
            success : true,
            message : 'Contact saved successfully!',
            data : newContact,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Failed to save contact',
            details: error.message,
        });
    }
};

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find(); 
        res.status(200).json({ 
            success : true,
            data : contacts,
            message : 'Fetching Contact successfully'
        });
    } catch (error) {
        console.log(e);
        res.status(500).json({
            error: 'Failed to fetch contacts', 
            details: error.message 
        });
    }
};

module.exports = { saveContact, getContacts };
