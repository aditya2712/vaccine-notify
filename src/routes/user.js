const router = require('express').Router();

const userController = require('../controllers/user')
const auth = require('../middlewares/auth')

// console.log(userController1)
// console.log(userController2)

router.get('/logout', userController.user_logout)
router.get('/dashboard', auth, userController.user_dashboard_get)

module.exports = router;