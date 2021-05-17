const router = require('express').Router();

const userController = require('../controllers/user')
const auth = require('../middlewares/auth')

router.get('/logout', userController.user_logout)
router.get('/dashboard', auth, userController.user_dashboard_get)
router.get('/addpin', auth, userController.user_add_pin)
router.get('/deletepin', auth, userController.user_delete_pin)

module.exports = router;