const user = require('../models/user')

user_logout = async (req, res) => {
    try {
        res.clearCookie('otpToken');
        res.render('phoneNo.ejs',{
            message:{
                success: "Logged Out Successfully"
            }
        })
    } catch (error) {
        console.log(error)
    }
}

user_dashboard_get = async (req, res) => {
    try {
        res.render('user.ejs',{
            message:{},
            mobile: req.cookies.mobile
        });
    } catch (error) {
        console.log(error)
    }
}

user_add_pin = async(req, res) => {
    try {
        pin = req.query.pin;
        console.log(req.cookies.mobile)
        console.log(pin);
        user.find((err, currUser) => {
            console.log(currUser)
        })
        // console.log(currUser.schema.obj.pins);
        // await user.updateOne({mobile: req.cookies.mobile}, {$push : {pins: pin} }, function(error, success){
        //     if(error)
        //     console.log(error)
        //     else{
        //         console.log(success)
        //         console.log("added")
        //     }
        // })       
        // res.redirect('/user/dashboard') 
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    user_logout,
    user_dashboard_get,
    user_add_pin
}
