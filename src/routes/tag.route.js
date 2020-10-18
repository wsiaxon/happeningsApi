const { Router } = require('express');
const { getAllTags, getPagedTags, getTagById, createTag } = require('../controllers/tag');
const asyncWrapper = require('../middleware/asyncWrapper');
const { createTagSchema, editTagSchema } = require('../validations/tag.validators');
const validator = require('../middleware/validator');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/',
  verifyToken,
  asyncWrapper(getAllTags),
);

router.get(
  '/getAll',
  asyncWrapper(getPagedTags),
);

router.post(
  '/',
  verifyToken,
  validator(createTagSchema),
  asyncWrapper(createTag),
);

router.get(
  '/:id',
  asyncWrapper(getTagById),
);

router.get(
  '/:id',
  verifyToken,
  validator(editTagSchema),
  asyncWrapper(getTagById),
);

module.exports = router;
