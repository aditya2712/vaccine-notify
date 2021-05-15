const router = require('express').Router();

const userController = require('../controllers/user')
const auth = require('../middlewares/auth')

router.get('/logout', userController.user_logout)
router.get('/dashboard', auth, userController.user_dashboard_get)

module.exports = router;