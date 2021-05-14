const router = require('express').Router();

const otpController = require('../controllers/otp')
const auth = require('../middlewares/auth')


router.get( '/request', auth, otpController.otp_request_get )
router.get( '/verify', auth, otpController.otp_verify_get )

module.exports = router