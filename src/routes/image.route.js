const { Router } = require('express');
const { uploadImage, getAllImages } = require('../controllers/image');
const asyncWrapper = require('../middleware/asyncWrapper');
const validator = require('../middleware/validator');
const { verifyToken, isAdmin } = require('../middleware/authentication');
const router = Router();

router.post(
  '/upload',
  verifyToken,
  asyncWrapper(uploadImage),
);

router.get(
  '/getAll',
  verifyToken,
  asyncWrapper(getAllImages),
);

module.exports = router;
