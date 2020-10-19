const { Router } = require('express');
const { getAllCategories, getCategoryById, createCategory } = require('../controllers/category');
const { createCategorySchema } = require('../validations/category.validators');
const validator = require('../middleware/validator');
const asyncWrapper = require('../middleware/asyncWrapper');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/getAll',
  asyncWrapper(getAllCategories),
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
