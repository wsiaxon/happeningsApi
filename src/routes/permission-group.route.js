const { Router } = require('express');
const { getAllPermissionGroups, getPagedPermissionGroups, getPermissionGroupById, createPermissionGroup } = require('../controllers/permission-group');
const asyncWrapper = require('../middleware/asyncWrapper');
const { createPermissionGroupSchema } = require('../validations/permissionGroup.validators');
const validator = require('../middleware/validator');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/',
  verifyToken,
  asyncWrapper(getAllPermissionGroups),
);

router.get(
  '/getAll',
  asyncWrapper(getPagedPermissionGroups),
);

router.post(
  '/',
  verifyToken,
  validator(createPermissionGroupSchema),
  asyncWrapper(createPermissionGroup),
);

router.get(
  '/:id',
  asyncWrapper(getPermissionGroupById),
);

module.exports = router;
