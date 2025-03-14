const { ScrapRequest } = require("../../model/ScrapRequestModel/ScrapRequestModel")

const requestScrap = async (req, res) =>{
    try{
        const{scraptype, quantity, description,address} = req.body;
        const{city,userid,vendorid} = req.params

        if(scraptype ||  quantity ||  description || address || city || userid || vendorid){
            return res.json({
                success : false,
                message : "Something missing !"
            })
        }

        const newRequest = await new ScrapRequest({
            vendorid,
            userid,
            city,
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

        return res.json({
            success : true,
            message : "Successfully request has been sent !"
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success : false,
            message : "Internal error"
        })
    }
}

module.exports = {requestScrap}