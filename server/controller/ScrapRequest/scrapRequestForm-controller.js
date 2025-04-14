const ScrapRequest = require("../../model/ScrapRequestModel/ScrapRequestModel")

const requestScrap = async (req, res) =>{
    try{
        const{scraptype, quantity, description,address,vendorname,email} = req.body;
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
            email : email,
            address : {
                name : address.name,
                phone : address.phone,
                pincode : address.pincode,
                landmark : address.landmark,
                addresslane : address.address,
                city : address.city,
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

const updateSchedule = async(req,res)=>{
    try{
        const {date} = req.body;
        const{reqId} = req.params;
        if(!date){
            return res.status(400).json({
                success : false,
                message : "Something missing !"
            })
        }

        const requestItem = await ScrapRequest.findByIdAndUpdate(reqId,{schedule:date},{new:true});
        if(!requestItem){
            return res.status(401).json({
                success : false,
                message : "Please try again !",
            })
        }

        return res.status(201).json({
            success : true,
            message : "pickup has been scheduled",
            data : requestItem,
        })
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Internal error'
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

const cancleRequest = async(req,res)=>{
    try{
        const {status} = req.body;
        const{reqId} = req.params;
        if(!status){
            return res.status(400).json({
                success : false,
                message : "Something missing !"
            })
        }

        const requestItem = await ScrapRequest.findByIdAndUpdate(reqId,{status:status},{new:true});
        if(!requestItem){
            return res.status(401).json({
                success : false,
                message : "Please try again !",
            })
        }

        return res.status(201).json({
            success : true,
            message : "Request has been cancelled..",
            data : requestItem,
        })
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Internal error'
        })
    }
}
module.exports = {requestScrap,fetchAllRequestsForVendor,fetchAllRequestsByUser,updateSchedule,cancleRequest}