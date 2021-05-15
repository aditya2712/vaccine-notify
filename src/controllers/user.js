
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

module.exports = {
    user_logout,
    user_dashboard_get
}
