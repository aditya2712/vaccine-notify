const router = require('express').Router();
const otpRouter = require('./otp')
const userRouter = require('./user')


router.use('/otp', otpRouter)
router.use('/user', userRouter);

module.exports = router;