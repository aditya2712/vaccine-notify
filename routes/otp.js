const router = require('express').Router();
const fetch = require('node-fetch');
const crypto = require('crypto');

const auth = require('../middlewares/auth')

router.get('/request', auth, async (req, res)=>{
    const fetchBody = req.query;

    try {
        const apiResponse = await fetch('https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP',{
            method: 'post',
            body: JSON.stringify(fetchBody),
            headers: { 'Content-Type': 'application/json' }
        })
        apiResponseJson = await apiResponse.json();
        const txnId = apiResponseJson.txnId
        res.clearCookie('otpToken');
        res.cookie('txnId', txnId, {maxAge: 180000 }).send("OTP send")
    } catch (e) {
        console.log(e);
        res.send("OTP Already Send")
    }

})

router.get('/verify', auth, async(req, res)=>{
    const otp = req.query.otp;
    const hashedOtp = crypto.createHash("sha256").update(otp).digest('hex');
    
    const txnId = req.cookies.txnId;
    
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
        res.clearCookie('txnId');
        res.cookie('otpToken', token, {maxAge: 100000000000}).send("User Authenticated");
    } catch (e) {
        console.log(e);
        res.send("Internal Server Error")
    }

})

module.exports = router