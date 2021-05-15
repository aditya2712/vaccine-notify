const router = require('express').Router();
const auth = require('../middlewares/auth')

router.get('/logout', (req, res) => {
    res.clearCookie('otpToken');
    res.render('phoneNo.ejs',{
        message:{
            success: "Logged Out Successfully"
        }
    })
})

router.get('/dashboard', auth, (req, res) => {
    res.render('user.ejs',{
        message:{},
        mobile: req.cookies.mobile
    });
})



module.exports = router;