const express = require('express');
const router = express.Router();
const { loginUser, logoutUser, registerUser ,authMiddleWare} = require('../../controller/user/auth-user');

router.post('/user-login', loginUser);
router.post('/user-register', registerUser);
router.post('/user-logout', logoutUser);
router.get('/checkAuth', authMiddleWare,(req,res)=>{
    const user = req.user;
    res.status(200).json({
        success : true,
        message : "Authenticated User",
        user,
    });
});

module.exports = router;
