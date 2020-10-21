const { Router } = require('express');
const { getAllRoles, getRoleById, createRole, getRoleForEditById, getAllPermissions } = require('../controllers/role');
const asyncWrapper = require('../middleware/asyncWrapper');
const { createRoleSchema } = require('../validations/role.validators');
const validator = require('../middleware/validator');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/getAllPermissions',
  getAllPermissions,
);

router.get(
  '/getAll',
  asyncWrapper(getAllRoles),
);

router.post(
  '/create',
  verifyToken,
  validator(createRoleSchema),
  asyncWrapper(createRole),
);

router.get(
  '/getForEdit/:id',
  asyncWrapper(getRoleForEditById),
);

router.get(
  '/get/:id',
  asyncWrapper(getRoleById),
);

module.exports = router;
