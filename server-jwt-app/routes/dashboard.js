const router = require('express').Router();
const dashboardController = require('../controllers/dashboard-controller');
const authorization = require('../middlewares/check-auth');

router.get('/', authorization, dashboardController.showDashboard);

module.exports = router;