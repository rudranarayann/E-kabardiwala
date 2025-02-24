const VendorAuth = require('../../model/Vendor/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerVendor = async(req,res)=>{
    const{username,email,password,companyname} = req.body;
    if(!username || !email || !password || !companyname){
        return res.json({
            success : false,
            message : 'Please re-enter !'
        })
    }

    try{
        const checkVendor = await VendorAuth.findOne({email});
        if(checkVendor){
            return res.json({
                success : false,
                message : 'User already exists',
            })
        }

        const hashPassword = await bcrypt.hash(password,12);
        const newlyCreatedVendor = new VendorAuth({
            username,
            email,
            password : hashPassword,
            companyname
        });

        await newlyCreatedVendor.save();

        res.status(200).json({
            success : true,
            message : 'User Successfully registerd'
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Some error occured'
        })
    }
}

const loginVendor = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.json({
            success : false,
            message : 'Email or password not found !'
        })
    }

    try{
        const checkVendor = await VendorAuth.findOne({email});
        if(!checkVendor){
            return res.json({
                succes : false,
                message : 'User is not found !'
            })
        }

        const checkPasswordMatch = await bcrypt.compare(password,checkVendor.password);
        if(!checkPasswordMatch){
            return res.json({
                success : false,
                message : 'Wrong password'
            })
        }

        const token =jwt.sign ({
            id : checkVendor._id,
            email : checkVendor.email,
            role : checkVendor.role,
            username : checkVendor.username,
            companyname : checkVendor.companyname
        },'CLIENT_SERVER_KEY' , {expiresIn : '60m'});

        res.cookie('token',token,{httponly : true, secure : false, SameSite : 'none'}).json({
            success : true,
            message : 'Log in successfully',
            data : {
                email : checkVendor.email,
                role : checkVendor.role,
                id : checkVendor._id,
                username : checkVendor.username,
                companyname : checkVendor.companyname
            }
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success : false,
            message : 'Some error occurred'
        })
    }
}


const logoutVendor = async(req,res)=>{
    res.clearCookie("token").json({
        success : true,
        message : 'Successfully logged out',
    })
}
module.exports = {loginVendor,registerVendor,logoutVendor};