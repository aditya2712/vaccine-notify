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
        res.render('user.ejs',{
            message:{},
            mobile: req.cookies.mobile,
            pins: {}
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
            return res.render('user.ejs', {
                message:{
                    success: "Pin is already added for notification"
                },
                mobile: mobile,
                pins: pins
            })
        }

        pins.push(newPin);
        await User.updateOne({mobile: mobile}, { $set: {pins: pins} })

        existingPin = await Pin.findOne({pin: newPin}).exec()
        if(existingPin){
            users = existingPin.user_ids;
            users.push(user._id);
            await Pin.updateOne({pin: newPin}, {$set: {user_ids: users}});
            return res.render('user.ejs', {
                message:{
                    success: "Pin Added for notification"
                },
                mobile: mobile,
                pins: pins
            })
        }

        const pin = new Pin({
            pin: newPin,
            user_ids : [user._id]
        })
        await pin.save()
        return res.render('user.ejs', {
            message:{
                success: "Pin Added for notification"
            },
            mobile: mobile,
            pins: pins
        })
        
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
        for( let i = 0; i < pins.length; i++){ 
            if ( pins[i] == pinToDel) { 
                pins.splice(i, 1);
                break; 
            }
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

        res.render('user.ejs', {
            message:{
                success: "Pin Deleted"
            },
            mobile:  mobile,
            pins: pins
        })
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
