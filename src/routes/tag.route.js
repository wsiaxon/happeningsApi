const { Router } = require('express');
const { getAllTags } = require('../controllers/tag');
const asyncWrapper = require('../middleware/asyncWrapper');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/tags',
  verifyToken,
  isAdmin,
  asyncWrapper(getAllTags),
);

module.exports = router;
