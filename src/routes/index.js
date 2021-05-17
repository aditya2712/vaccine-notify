const router = require('express').Router();
const otpRouter = require('./otp')
const userRouter = require('./user')
const isLoggedIn = require('../middlewares/isLoggedIn')

router.use('/otp', otpRouter)
router.use('/user', userRouter);


router.get('/', isLoggedIn, (req, res)=>{
    res.render('phoneNo.ejs', {
        message: {
        }
    });
})

module.exports = router;