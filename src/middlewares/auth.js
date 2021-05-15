const User = require('../models/user');

auth = (req, res, next) => {
    const token = req.cookies.otpToken
    const mobile = req.cookies.mobile
    const user = User.findOne({
        mobile: mobile,
        token: token
    })
    if(!user || !token || !mobile){
        return res.render('phoneNo.ejs', {
            message: {}
        });
    }
    next();
}

module.exports = auth

