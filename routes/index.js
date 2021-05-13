const router = require('express').Router();
const otpRouter = require('./otp')


router.use('/otp', otpRouter)

module.exports = router;