const { Router } = require('express');
const adminController = require('../controllers/admin');
const asyncWrapper = require('../middleware/asyncWrapper');
const authentication = require('../middleware/authentication');

const router = Router();

const { verifyToken, isAdmin } = authentication;
const { getAllUsers } = adminController;

router.get(
  '/users',
  verifyToken,
  isAdmin,
  asyncWrapper(getAllUsers),
);

module.exports = router;
