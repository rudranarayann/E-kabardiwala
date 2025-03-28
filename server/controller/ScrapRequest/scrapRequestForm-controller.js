const ScrapRequest = require("../../model/ScrapRequestModel/ScrapRequestModel")

const requestScrap = async (req, res) =>{
    try{
        const{scraptype, quantity, description,address,vendorname} = req.body;
        const{city,userid,vendorid} = req.params;

        if(!scraptype ||  !quantity ||  !description || !address || !city || !userid ||!vendorid || !vendorname){
            return res.status(400).json({
                success : false,
                message : "Something missing !"
            })
        }

        const newRequest = await new ScrapRequest({
            vendorid,
            userid,
            city,
            vendorname,
            address : {
                name : address.name,
                phone : address.phone,
                pincode : address.pincode,
                landmark : address.landmark,
                addresslane : address.address,
                city : address.city
            },
            quantity,
            description,
            scraptype
        });

        await newRequest.save();

        return res.status(201).json({
            success : true,
            message : "Successfully request has been sent !",
            data : newRequest,
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success : false,
            message : "Internal error"
        })
    }
}

const fetchAllRequestsForVendor = async(req,res)=>{
    try{
        const{vendorid} = req.params;
        if(!vendorid){
            return res.status(400).json({
                success : false,
                message : "something missing !"
            })
        }

        const allRequest = await ScrapRequest.find({vendorid});
    
        res.status(201).json({
            success : true,
            message : "Fetched successfully",
            data : allRequest,
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Internal error'
        })
    }
}

const fetchAllRequestsByUser = async(req,res)=>{
    try{
        const{userid} = req.params;
        if(!userid){
            return res.status(400).json({
                success : false,
                message : "something missing !"
            })
        }

        const allrequests = await ScrapRequest.find({userid});
        res.status(201).json({
            success : true,
            message : "Fetched successfully",
            data : allrequests,
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Internal error'
        })
    }
}
module.exports = {requestScrap,fetchAllRequestsForVendor,fetchAllRequestsByUser}