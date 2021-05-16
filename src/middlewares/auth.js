const User = require('../models/user');

auth = async (req, res, next) => {
    try {
        const token = req.cookies.otpToken
        const mobile = req.cookies.mobile
        const user = await User.findOne({
            mobile: mobile,
            token: token
        }).exec()
        console.log(user)
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

