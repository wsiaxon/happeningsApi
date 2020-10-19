const { Router } = require('express');
const roleRoute = require('./role.route');
const userRoute = require('./user.route');
const categoryRoute = require('./category.route');
const commentRoute = require('./comment.route');
const tagRoute = require('./tag.route');
const authRoute = require('./auth.route');
const storyRoute = require('./story.route');

const router = Router();

router.use('/role', roleRoute);
router.use('/user', userRoute);
router.use('/collection', categoryRoute);
router.use('/comment', commentRoute);
router.use('/tag', tagRoute);
router.use('/auth', authRoute);
router.use('/story', storyRoute);

module.exports = router;
