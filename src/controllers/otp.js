const fetch = require('node-fetch');
const crypto = require('crypto');

const User = require('../models/user');


otp_request_get =  async (req, res)=>{
    try {
        const mobile = req.query.mobile;
        const fetchBody = {
            mobile
        };
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
        res.render('otp.ejs',{
            message:{
                success: "OTP send"
            }
        })
    } catch (e) {
        console.log(e);
        res.render('otp.ejs',{
            message: {
                error: "OTP already send, it is valid for 3 minutes"
            }
        })
    }
}

otp_verify_get = async(req, res)=>{

    try {
        const otp = req.query.otp;
        const hashedOtp = crypto.createHash("sha256").update(otp).digest('hex');
        
        const txnId = req.cookies.txnId;
        const mobile = req.cookies.mobile;
        
        const fetchBody = {
            "otp": hashedOtp,
            "txnId": txnId
        }

        const apiResponse = await fetch('https://cdn-api.co-vin.in/api/v2/auth/public/confirmOTP',{
            method: 'post',
            body: JSON.stringify(fetchBody),
            headers: { 'Content-Type': 'application/json' }
        })
        apiResponseJson = await apiResponse.json();
        if(apiResponseJson.errorCode){
            return res.render('otp.ejs',{
                message:{
                    error: apiResponseJson.error
                }
            })
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
        res.render('user.ejs',{
            message:{
                success:"Logged In Successfully"
            },
            mobile: req.cookies.mobile
        })
    } catch (e) {
        console.log(e);
        res.render('phoneNo.ejs',{
            message: {
                error: "Internal Server Error"
            }
        })
    }

}

module.exports = {
    otp_request_get,
    otp_verify_get
}