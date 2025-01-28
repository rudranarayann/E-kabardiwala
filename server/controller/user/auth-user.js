const userAuth = require('../../model/User/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async(req,res)=>{
    const{username,email,password} = req.body;
    if(!username || !email || !password){
        return res.status(400).json({
            success : false,
            message : 'Something not found !'
        })
    }
    
    try{
        const checkUser = await userAuth.findOne({email});
        if(checkUser){
            res.json({
                success : false,
                message : 'User already exists',
            })
        }

        const hashPassword = await bcrypt.hash(password,12);
        const newlyCreatedUser = new userAuth({
            username,
            email,
            password : hashPassword
        });

        await newlyCreatedUser.save();

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

const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({
            success : false,
            message : 'Email or password not found !'
        })
    }

    try{
        const checkUser = await userAuth.findOne({email});
        if(!checkUser){
            return res.status(400).json({
                succes : false,
                message : 'User is not found !'
            })
        }

        const checkPasswordMatch = await bcrypt.compare(password,checkUser.password);
        if(!checkPasswordMatch){
            return res.status(400).json({
                success : false,
                message : 'Wrong password'
            })
        }

        const token =jwt.sign ({
            id : checkUser._id,
            email : checkUser.email,
            role : checkUser.role,
            userName : checkUser.username,
        },'CLIENT_SERVER_KEY' , {expiresIn : '60m'});

        res.cookie('token',token,{httponly : true, secure : false, SameSite : 'none'}).json({
            success : true,
            message : 'Log in successfully',
            data : {
                email : checkUser.email,
                role : checkUser.role,
                id : checkUser._id,
                username : checkUser.username
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


const logoutUser = async(req,res)=>{
    res.clearCookie("token").json({
        success : true,
        message : 'Successfully logged out',
    })
}

const authMiddleWare = async(req,res,next)=>{
    const token = req.cookie.token;
    if(!token){
        return res.status(401).json({
            success : false,
            message : "Unauthorised user"
        })
    }

    try{
        const decode = jwt.verify(token,'CLIENT_SERVER_KEY');
        req.user = decode;
        next();
    }catch(e){
        console.log(e);
        return res.status(401).json({
            success : false,
            message : "Unauthorised user"
        })
    }
}
module.exports = {loginUser,registerUser,logoutUser,authMiddleWare};