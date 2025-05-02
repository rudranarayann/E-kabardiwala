const userAuth = require('../../model/User/User');
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

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.json({
            success: false,
            message: 'Please re-enter!'
        })
    }

    try {
        const checkUser = await userAuth.findOne({ email });
        if (checkUser) {
            res.json({
                success: false,
                message: 'User already exists',
            })
        }

        const hashPassword = await bcrypt.hash(password, 12);
        const newlyCreatedUser = new userAuth({
            username,
            email,
            password: hashPassword
        });

        await newlyCreatedUser.save();

        res.status(200).json({
            success: true,
            message: 'User Successfully registerd'
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occured'
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({
            success: false,
            message: 'Email or password not found !'
        })
    }

    try {
        const checkUser = await userAuth.findOne({ email });
        if (!checkUser) {
            return res.json({
                succes: false,
                message: 'User is not found !'
            })
        }

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) {
            return res.json({
                success: false,
                message: 'Wrong password'
            })
        }

        const token = jwt.sign({
            id: checkUser._id,
            email: checkUser.email,
            role: checkUser.role,
            username: checkUser.username,
        }, 'CLIENT_SERVER_KEY', { expiresIn: '120m' });

        res.cookie('token', token, { httponly: true, secure: false, SameSite: 'none' }).json({
            success: true,
            message: 'Log in successfully',
            data: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                username: checkUser.username
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Some error occurred'
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const findByEmail = await userAuth.findOne({ email });

        if (!findByEmail) {
            return res.status(400).json({
                success: false,
                message: "User not found !"
            })
        }

        const token = crypto.randomBytes(32).toString('hex');
        findByEmail.resetToken = token;
        findByEmail.resetTokenExpire = Date.now() + 3600000;
        await findByEmail.save();
        const role = "consumer";

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

        const account = await userAuth.findOne({
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

const logoutUser = async (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: 'Successfully logged out',
    })
}

const authMiddleWare = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised user"
        })
    }

    try {
        const decode = jwt.verify(token, 'CLIENT_SERVER_KEY');
        req.user = decode;
        next();
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            success: false,
            message: "Unauthorised user"
        })
    }
}
module.exports = { loginUser, registerUser, logoutUser, authMiddleWare,resetPassword ,forgotPassword};