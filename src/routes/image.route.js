const { Router } = require('express');
const { uploadImage } = require('../controllers/image');
const asyncWrapper = require('../middleware/asyncWrapper');
const validator = require('../middleware/validator');
const { verifyToken, isAdmin } = require('../middleware/authentication');

const router = Router();

router.post(
  '/upload',
  // verifyToken,
  asyncWrapper(uploadImage),
);

module.exports = router;
