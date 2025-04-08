const Address = require("../../model/Address/addressModel");

const addAddress = async (req, res) => {
    const { userid, name, address, city, pincode, phone, landmark } = req.body;

    try {

        if (!userid || !name || !address || !city || !pincode || !phone || !landmark) {
            return res.json({
                success: false,
                message: 'Fill all the fields',
            })
        }

        const newlyAddress = await new Address({
            userid,
            name,
            address,
            city,
            pincode,
            phone,
            landmark
        });

        await newlyAddress.save();
        return res.status(201).json({
            success: true,
            data: newlyAddress,
            message: "Address added successfully...",
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some error occured !",
        })
    }
}

const editAddress = async (req, res) => {

    try {
        const { addressid, userid } = req.params;
        const formData = req.body;


        if (!addressid || !userid) {
            return res.json({
                success: false,
                message: 'User ID and Address ID required!',
            });
        }

        const address = await Address.findOneAndUpdate({
            _id: addressid,
            userid
        }, formData, { new: true })

        if (!address) {
            return res.json({
                success: false,
                message: 'Address not Found !',
            })
        }

        res.status(200).json({
            success: true,
            message: 'Address successfully Updated',
            data: address,
        })

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some error occured !",
        })
    }
}

const deleteAddress = async (req, res) => {

    const { userid, addressid } = req.params;

    try {

        if (!userid || !addressid) {
            return res.json({
                success: false,
                message: 'Address not found !',
            })
        }

        const address = await Address.findOneAndDelete({
            _id: addressid,
            userid,
        });

        if (!address) {
            return res.json({
                success: false,
                message: 'Address Not found !',
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Deleted successful',
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some error occured !",
        })
    }
}

const fetchAddress = async (req, res) => {

    const { userid } = req.params;

    try {
        if (!userid) {
            return res.json({
                success: false,
                message: 'Something went wrong !',
            })
        }

        const allAdress = await Address.find({ userid });

        return res.status(200).json({
            success: true,
            data: allAdress,    
            message: 'Successfully address fetched'
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some error occured !",
        })
    }
}

module.exports = { addAddress, editAddress, deleteAddress, fetchAddress };