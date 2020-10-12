const { Router } = require('express');
const { getAllComments } = require('../controllers/comment');
const asyncWrapper = require('../middleware/asyncWrapper');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/',
  verifyToken,
  isAdmin,
  asyncWrapper(getAllComments),
);

module.exports = router;
