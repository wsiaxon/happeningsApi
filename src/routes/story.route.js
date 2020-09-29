const { Router } = require('express');
const asyncWrapper = require('../middleware/asyncWrapper');
const authentication = require('../middleware/authentication');
const storyController = require('../controllers/story');
const storySchema = require('../validations/story.validators');
const validator = require('../middleware/validator');

const router = Router();

const {
  verifyToken, isAuthor,
} = authentication;
const {
  createStory, getAllStories, getStoryBySlug, editStory,
} = storyController;
const {
  createStorySchema, getAllStoriesSchema, editStorySchema,
} = storySchema;

router.post(
  '/',
  verifyToken,
  validator(createStorySchema),
  asyncWrapper(createStory),
);

router.get(
  '/',
  validator(getAllStoriesSchema),
  asyncWrapper(getAllStories),
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
