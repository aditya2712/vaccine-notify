const User = require('../models/user');

isLoggedIn = (req, res, next) => {
    const token = req.cookies.otpToken
    const mobile = req.cookies.mobile
    const user = User.findOne({
        mobile: mobile,
        token: token
    })
    if(user && token && mobile){
        req.user = user;
        req.successMsg = "Already Logged In"
        return res.redirect('/user/dashboard')
    }
    next();
}

module.exports = isLoggedIn