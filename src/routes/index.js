const router = require('express').Router();
const otpRouter = require('./otp')
const userRouter = require('./user')
const auth = require('../middlewares/auth')

router.use('/otp', otpRouter)
router.use('/user', userRouter);


router.get('/', auth, (req, res)=>{
    res.render('phoneNo.ejs');
})

router.get('/requestotp', auth, (req, res)=>{
    res.render('phoneNo.ejs');
})

router.get('/verifyotp', auth, (req, res)=> {
    res.render('otp.ejs');
})

module.exports = router;