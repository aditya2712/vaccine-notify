const router = require('express').Router();

router.get('/logout', (req, res) => {
    res.clearCookie('otpToken');
    res.send('user logged out')
})



module.exports = router;