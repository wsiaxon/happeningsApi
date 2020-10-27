const { Router } = require('express');
const { getAllComments, getCommentById, createComment } = require('../controllers/comment');
const { createCommentSchema } = require('../validations/comment.validators');
const validator = require('../middleware/validator');
const asyncWrapper = require('../middleware/asyncWrapper');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.get(
  '/getAll',
  asyncWrapper(getAllComments),
);

router.post(
  '/create',
  // verifyToken,
  validator(createCommentSchema),
  asyncWrapper(createComment),
);

router.get(
  '/get/:id',
  asyncWrapper(getCommentById),
);

module.exports = router;
