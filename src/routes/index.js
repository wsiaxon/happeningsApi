const { Router } = require('express');
const adminRoute = require('./admin.route');
const authRoute = require('./auth.route');
const storyRoute = require('./story.route');

const router = Router();

router.use('/admin', adminRoute);
router.use('/auth', authRoute);
router.use('/stories', storyRoute);

module.exports = router;
