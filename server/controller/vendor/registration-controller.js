
const VendorRegistration = require( "../../model/VendorRegistration/Vendor-Registration")

const registrationVendor = async(req,res)=>{
    const { vendorid,vendorname ,location,city ,plastic ,metal ,glass ,paper } = req.body;
    console.log()
    try{
        if(!vendorid || !vendorname  || !location || !city  || !plastic  || !metal  || !glass  || !paper){
            return res.json({
                message : 'Something Missing !',
                success : false,
            })
        }

        let newVendor = await VendorRegistration.findOne({vendorid});
        if(!newVendor){
            newVendor = new VendorRegistration({
                vendorid,
                vendorname,
                location,
                prices : []
            })
        }
        const findIndexOfCurrentCity = newVendor.prices.findIndex(item => item.city.toString() === city);

        if(findIndexOfCurrentCity === -1){
            newVendor.prices.push({
                city,
                plastic,
                glass,
                metal,
                paper
            })
        }else{
            newVendor.prices[findIndexOfCurrentCity].plastic = plastic,
            newVendor.prices[findIndexOfCurrentCity].glass = glass,
            newVendor.prices[findIndexOfCurrentCity].metal = metal,
            newVendor.prices[findIndexOfCurrentCity].paper = paper
        }
        
        await newVendor.save();

        res.status(200).json({
            success : true,
            data : newVendor.prices,
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : 'Some error occures !',
            success : false,
        })
    }
    

}

const addCity = async(req,res)=>{
    const{vendorid,city ,plastic ,metal ,glass ,paper} = req.body;

    try{

        const vendor = await VendorRegistration.findOne({vendorid});
        if(!vendor){
            return res.json({
                success : false,
                message : 'First register then try to add another city !'
            })
        }

        const findIndexOfCurrentCity = vendor.prices.findIndex((item)=> item.city.toString() === city);

        if(findIndexOfCurrentCity === -1){
            vendor.prices.push({
                city,
                plastic,
                glass,
                metal,
                paper
            })
        }else{
            return res.json({
                success : false,
                message : "Already exists !"
            })
        }


        await vendor.save();
        return res.status(200).json({
            success : true,
            data : vendor.prices,
            message : 'city added successfully done'
        })

    }catch(e){
        console.log(e);
        return res.status(500).json({
            success : false,
            message : 'Some error occurred'
        })
    }
}

const updatePrice = async(req,res)=>{
    const {plastic ,metal ,glass ,paper } = req.body;
    const {vendorid,city} = req.params;

    try{
        if(!vendorid || !city  || !plastic  || !metal  || !glass  || !paper){
            return res.json({
                message : 'Something Missing !',
                success : false,
            })
        }

        let newVendor = await VendorRegistration.findOne({vendorid});
        if(!newVendor){
            return res.json({
                message : 'Document Not Found !',
                success : false,
            })
        }

        const findIndexOfCurrentCity = newVendor.prices.findIndex(item => item.city.toString() === city);

        if(findIndexOfCurrentCity === -1){
            return res.json({
                message : 'City not found !',
                success : false,
            })
        }else{
            newVendor.prices[findIndexOfCurrentCity].plastic = plastic,
            newVendor.prices[findIndexOfCurrentCity].glass = glass,
            newVendor.prices[findIndexOfCurrentCity].metal = metal,
            newVendor.prices[findIndexOfCurrentCity].paper = paper
        }
        
        await newVendor.save();

        res.status(200).json({
            success : true,
            data : newVendor.prices,
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : 'Some error occures !',
            success : false,
        })
    }
}

const fetchRegisteredCities = async(req,res)=>{
    const {vendorid} = req.params;

    try{
        if(!vendorid){
            return res.status(400).json({
                message : 'Something Missing !',
                success : false,
            })
        }

        let newVendor = await VendorRegistration.findOne({vendorid});
        if(!newVendor){
            return res.json({
                message : 'Document Not Found !',
                success : false,
            })
        }

        return res.status(200).json({
            success : true,
            data : newVendor.prices,
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : 'Some error occures !',
            success : false,
        })
    }
}

const deleteCity = async(req,res)=>{
    const { vendorid,city } = req.params;

    try{
        if(!vendorid || !city ){
            return res.json({
                message : 'Something Missing !',
                success : false,
            })
        }

        let newVendor = await VendorRegistration.findOne({vendorid});
        if(!newVendor){
            return res.json({
                message : 'Document Not Found !',
                success : false,
            })
        }

        const findIndexOfCurrentCity = newVendor.prices.findIndex(item => item.city.toString() === city);

        if(findIndexOfCurrentCity === -1){
            return res.json({
                message : 'City not found !',
                success : false,
            })
        }else{
            newVendor.prices.splice(findIndexOfCurrentCity,1);
        }
        
        await newVendor.save();

        res.status(200).json({
            success : true,
            data : newVendor,
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            message : 'Some error occures !',
            success : false,
        })
    }
}



module.exports = {registrationVendor,updatePrice,fetchRegisteredCities,deleteCity,addCity};