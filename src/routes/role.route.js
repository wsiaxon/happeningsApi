const { Router } = require('express');
const { getAllRoles, getPagedRoles, getRoleById, createRole } = require('../controllers/role');
const asyncWrapper = require('../middleware/asyncWrapper');
const { createRoleSchema } = require('../validations/role.validators');
const validator = require('../middleware/validator');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/',
  verifyToken,
  asyncWrapper(getAllRoles),
);

router.get(
  '/getAll',
  asyncWrapper(getPagedRoles),
);

router.post(
  '/',
  verifyToken,
  validator(createRoleSchema),
  asyncWrapper(createRole),
);

router.get(
  '/:id',
  asyncWrapper(getRoleById),
);

module.exports = router;
