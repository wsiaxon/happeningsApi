const { Router } = require('express');
const { getAllTags } = require('../controllers/tag');
const asyncWrapper = require('../middleware/asyncWrapper');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/',
  asyncWrapper(getAllTags),
);

module.exports = router;
