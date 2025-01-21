const express = require('express');
const router = express.Router();
const { loginUser, logoutUser, registerUser } = require('../../controller/user/auth-user');

router.post('/user-login', loginUser);
router.post('/user-register', registerUser);
router.post('/user-logout', logoutUser);

module.exports = router;
