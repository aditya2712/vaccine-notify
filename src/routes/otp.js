const router = require('express').Router();
const fetch = require('node-fetch');
const crypto = require('crypto');

const User = require('../models/user');
const auth = require('../middlewares/auth');


router.get('/request', auth, async (req, res)=>{
    
    const mobile = req.query.mobile;
    const fetchBody = {
        mobile
    };
    try {
        const apiResponse = await fetch('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',{
            method: 'post',
            body: JSON.stringify(fetchBody),
            headers: { 'Content-Type': 'application/json' }
        })
        apiResponseJson = await apiResponse.json();
        const txnId = apiResponseJson.txnId
        res.clearCookie('otpToken');
        res.cookie('txnId', txnId, {maxAge: 180000 })
        res.cookie('mobile', mobile, {maxAge: 100000000000 })
        res.render('otp.ejs')
    } catch (e) {
        console.log(e);
        res.send("OTP Already Send")
    }
})

router.get('/verify', auth, async(req, res)=>{
    const otp = req.query.otp;
    const hashedOtp = crypto.createHash("sha256").update(otp).digest('hex');
    
    const txnId = req.cookies.txnId;
    const mobile = req.cookies.mobile;
    
    const fetchBody = {
        "otp": hashedOtp,
        "txnId": txnId
    }
    
    try {
        const apiResponse = await fetch('https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',{
            method: 'post',
            body: JSON.stringify(fetchBody),
            headers: { 'Content-Type': 'application/json' }
        })
        apiResponseJson = await apiResponse.json();
        if(apiResponseJson.errorCode){
            return res.send(apiResponseJson.error)
        }
        token = apiResponseJson.token

        const oldUser = User.findOne({mobile: mobile})
        if(oldUser){
            User.updateOne({mobile: mobile}, { $set: {token: token} })
        }
        else{
            const newUser = new User({
                mobile: mobile,
                token: token
            })
            newUser.save(function(err){
                throw new Error(err)
            })
        }

        res.cookie('otpToken', token, {maxAge: 100000000000})
        res.send("User Authenticated: "+ req.cookies.mobile);
    } catch (e) {
        console.log(e);
        res.send("Internal Server Error")
    }

})

module.exports = router