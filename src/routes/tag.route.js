const { Router } = require('express');
const { getAllTags, getTagById, createTag } = require('../controllers/tag');
const asyncWrapper = require('../middleware/asyncWrapper');
const { createTagSchema, editTagSchema } = require('../validations/tag.validators');
const validator = require('../middleware/validator');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/getAll',
  asyncWrapper(getAllTags),
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
