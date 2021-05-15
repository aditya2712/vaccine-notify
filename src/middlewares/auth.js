const User = require('../models/user');

auth = (req, res, next) => {
    try {
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
    } catch (error) {
        console.log(error)
        next();
    }
}

module.exports = auth

