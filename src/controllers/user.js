const User = require('../models/user')
const Pin = require('../models/pin')

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
        // console.log(req.cookies)
        res.render('user.ejs',{
            message:{
                success: req.cookies.successMsg,
                error: req.cookies.errorMsg
            },
            user: req.user
        });
    } catch (error) {
        console.log(error)
    }
}

user_add_pin = async(req, res) => {
    try {
        newPin = req.query.pin;
        mobile = req.cookies.mobile;
        user = await User.findOne({mobile: mobile}).exec()
        
        pins = user.pins;
        flag = 0;
        for(i=0;i<pins.length;i++){
            if(pins[i] == newPin){
                flag = 1;
                break;
            }
        }
        if(flag){
            res.cookie('successMsg', "Pincode is already added for notification", {maxAge: 3500} )
            req.user = user
            return res.redirect('/user/dashboard')
        }

        pins.push(newPin);
        await User.updateOne({mobile: mobile}, { $set: {pins: pins} })

        existingPin = await Pin.findOne({pin: newPin}).exec()
        if(existingPin){
            users = existingPin.user_ids;
            users.push(user._id);
            await Pin.updateOne({pin: newPin}, {$set: {user_ids: users}});
            res.cookie('successMsg', "Pincode Added for notification", {maxAge: 3500} )
            user.pins = pins;
            req.user = user
            return res.redirect('/user/dashboard')
        }

        const pin = new Pin({
            pin: newPin,
            user_ids : [user._id]
        })
        await pin.save()
        res.cookie('successMsg', "Pincode Added for notification", {maxAge: 3500} )
        user.pins = pins;
        req.user = user
        return res.redirect('/user/dashboard')
        
        
    } catch (error) {
        console.log(error)
    }
}

user_delete_pin = async(req, res) =>{
    try {
        pinToDel = req.query.pin;
        mobile = req.cookies.mobile;

        user = await User.findOne({mobile: mobile}).exec()
        pins = user.pins;

        let initialLenghtOfPinsArray = pins.length;

        for( let i = 0; i < pins.length; i++){ 
            if ( pins[i] == pinToDel) { 
                pins.splice(i, 1);
                break; 
            }
        }

        if(initialLenghtOfPinsArray == pins.length){
            res.cookie('errorMsg', "Pincode does not exists", {maxAge: 3500} )
            req.user = user;
            return res.redirect('/user/dashboard')
        }

        await User.updateOne({mobile: mobile}, { $set: {pins: pins} })

        existingPin = await Pin.findOne({pin: pinToDel}).exec()
        userIDs = existingPin.user_ids;
        for( let i = 0; i < userIDs.length; i++){ 
            if ( userIDs[i] == user._id) { 
                userIDs.splice(i, 1);
                break; 
            }
        }
        await Pin.updateOne({pin: pinToDel}, { $set: {user_ids: userIDs} })

        res.cookie('successMsg', "Pincode deleted", {maxAge: 3500} )
        user.pins = pins;
        req.user = user;
        return res.redirect('/user/dashboard')

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    user_logout,
    user_dashboard_get,
    user_add_pin,
    user_delete_pin
}
