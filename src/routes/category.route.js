const { Router } = require('express');
const { getAllCategories, getCategoryById, getPagedCategories, createCategory } = require('../controllers/category');
const { createCategorySchema } = require('../validations/category.validators');
const validator = require('../middleware/validator');
const asyncWrapper = require('../middleware/asyncWrapper');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/',
  asyncWrapper(getAllCategories),
);

router.get(
  '/paged',
  asyncWrapper(getPagedCategories),
);

router.post(
  '/',
  verifyToken,
  validator(createCategorySchema),
  asyncWrapper(createCategory),
);

router.get(
  '/:id',
  asyncWrapper(getCategoryById),
);

module.exports = router;
