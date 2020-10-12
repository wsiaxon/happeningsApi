const { Router } = require('express');
const { getAllRoles } = require('../controllers/role');
const asyncWrapper = require('../middleware/asyncWrapper');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/roles',
  verifyToken,
  isAdmin,
  asyncWrapper(getAllRoles),
);

module.exports = router;
