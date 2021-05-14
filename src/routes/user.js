const router = require('express').Router();

router.get('/logout', (req, res) => {
    res.clearCookie('otpToken');
    res.render('phoneNo.ejs',{
        message:{
            success: "Logged Out Successfully"
        }
    })
})



module.exports = router;