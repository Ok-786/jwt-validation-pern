const router = require('express').Router();
const jwtAuthController = require('../controllers/jwtAuth-controller');
const authorization = require('../middlewares/check-auth');

router.post('/register', jwtAuthController.createUser);
router.post('/login', jwtAuthController.login);
router.get('/verify', authorization, jwtAuthController.isVerify);

module.exports = router;