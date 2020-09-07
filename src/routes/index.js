const { Router } = require('express');
const adminRoute = require('./admin.route');
const authRoute = require('./auth.route');

const router = Router();

router.use('/admin', adminRoute);
router.use('/auth', authRoute);

module.exports = router;
