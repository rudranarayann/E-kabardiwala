const VendorAuth = require('../../model/Vendor/Vendor');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'contact.scrapcollector@gmail.com',
        pass: 'dqqe ydql abhl neqx',
    },
});

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
                message : 'Vendor already exists',
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
            message : 'Vendor Successfully registerd'
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
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const findByEmail = await VendorAuth.findOne({ email });

        if (!findByEmail) {
            return res.status(400).json({
                success: false,
                message: "Vendor not found !"
            })
        }

        const token = crypto.randomBytes(32).toString('hex');
        findByEmail.resetToken = token;
        findByEmail.resetTokenExpire = Date.now() + 3600000;
        await findByEmail.save();
        const role = "vendor"

        const resetLink = `http://localhost:5173/auth/reset-password/${role}/${token}`;

        await transporter.sendMail({
            to: email,
            subject: 'Reset your password',
            html: `<p>Reset your password using the link:</p><a href="${resetLink}">${resetLink}</a>`,
        });

        res.status(200).json({
            success: true,
            message: 'Reset link sent to your email',
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some internal error"
        })
    }

}

const resetPassword = async (req, res) => {
    try {
        const { password } = req.body;
        const token = req.params.token;

        const account = await VendorAuth.findOne({
            resetToken: token,
            resetTokenExpire: { $gt: Date.now() }
        })

        if (!account) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        account.password = hashedPassword;
        account.resetToken = undefined;
        account.resetTokenExpire = undefined;

        await account.save();

        res.status(200).json({
            success: true,
            message: 'Password has been reseted...',
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Some internal error"
        })
    }
}

module.exports = {loginVendor,registerVendor,logoutVendor,forgotPassword,resetPassword};