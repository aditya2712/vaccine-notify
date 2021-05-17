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
        res.cookie('successMsg', "Already Logged In", {maxAge: 3500} )
        return res.redirect('/user/dashboard')
    }
    next();
}

module.exports = isLoggedIn