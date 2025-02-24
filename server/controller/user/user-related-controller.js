const VendorRegistration = require( "../../model/VendorRegistration/Vendor-Registration")
const fetchCityPrice = async(req,res)=>{
    try{
        const{city} = req.params;

        const vendorData = await VendorRegistration.find({
            'prices.city' : city
        })

        if(!vendorData){
            return res.json({
                sucess : false,
                message : 'No city available !'
            })
        }

        res.status(200).json({
            success : true,
            data : vendorData,
            message : 'Fetched successfully'
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Internal error occured'
        })
    }
}

module.exports = { fetchCityPrice};