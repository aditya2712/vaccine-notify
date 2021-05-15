const User = require('../models/user');

isLoggedIn = (req, res, next) => {
    const token = req.cookies.otpToken
    const mobile = req.cookies.mobile
    const user = User.findOne({
        mobile: mobile,
        token: token
    })
    if(user && token && mobile){
        return res.render('user.ejs', {
            message: {
                success: "Already Logged In"
            },
            mobile: req.cookies.mobile
        });
    }
    next();
}

module.exports = isLoggedIn