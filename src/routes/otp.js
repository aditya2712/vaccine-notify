const router = require('express').Router();

const otpController = require('../controllers/otp')
const isLoggedIn = require('../middlewares/isLoggedIn')


router.get( '/request', isLoggedIn, otpController.otp_request_get )
router.get( '/verify', isLoggedIn, otpController.otp_verify_get )

module.exports = router