const { Router } = require('express');
const asyncWrapper = require('../middleware/asyncWrapper');
const { verifyToken, isAuthor } = require('../middleware/authentication');
const { createStory, getAllStories, getStoryBySlug, editStory } = require('../controllers/story');
const { createStorySchema, getAllStoriesSchema, editStorySchema } = require('../validations/story.validators');
const validator = require('../middleware/validator');

const router = Router();

router.get(
  '/',
  validator(getAllStoriesSchema),
  asyncWrapper(getAllStories),
);

router.post(
  '/',
  verifyToken,
  validator(createStorySchema),
  asyncWrapper(createStory),
);

router.get(
  '/:id',
  asyncWrapper(getStoryBySlug),
);

router.get(
  '/:slug',
  asyncWrapper(getStoryBySlug),
);

router.put(
  '/:slug',
  verifyToken,
  asyncWrapper(isAuthor),
  validator(editStorySchema),
  asyncWrapper(editStory),
);

module.exports = router;
