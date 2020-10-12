const { Router } = require('express');
const { getAllUsers } = require('../controllers/user');
const asyncWrapper = require('../middleware/asyncWrapper');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/',
  verifyToken,
  isAdmin,
  asyncWrapper(getAllUsers),
);

module.exports = router;
