const { Router } = require('express');
const { getAllUsers, getPagedUsers, getUserById, createUser } = require('../controllers/user');
const asyncWrapper = require('../middleware/asyncWrapper');
const { createUserSchema } = require('../validations/user.validators');
const validator = require('../middleware/validator');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/',
  verifyToken,
  isAdmin,
  asyncWrapper(getAllUsers),
);

router.get(
  '/getAll',
  verifyToken,
  isAdmin,
  asyncWrapper(getPagedUsers),
);

router.post(
  '/',
  verifyToken,
  isAdmin,
  validator(createUserSchema),
  asyncWrapper(createUser),
);

router.get(
  '/:id',
  verifyToken,
  isAdmin,
  asyncWrapper(getUserById),
);

module.exports = router;
