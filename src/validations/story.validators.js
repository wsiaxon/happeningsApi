const { check } = require('express-validator');

module.exports = {
  createStorySchema: [
    check('title')
      .exists()
      .trim()
      .withMessage('title of the story is required')
      .matches(/[a-zA-Z]{3}/)
      .withMessage('title must contain at least a 3 letter word')
      .isLength({ min: 5, max: 50 })
      .withMessage('title should be between 5 to 50 characters'),

    check('content')
      .trim()
      .exists()
      .withMessage('story content is required')
      .isLength({ min: 50, max: 1024 })
      .withMessage('story body should be between 50 to 1024 characters'),

    check('tag')
      .optional()
      .isArray()
      .withMessage('tag must be an array'),

    check('status')
      .optional()
      .matches(/^(open|submitted)$/)
      .withMessage('Status must be either "open" or "submitted"'),
  ],

  getAllStoriesSchema: [
    check('status')
      .optional()
      .isIn(['open', 'submitted', 'approved', 'published', 'rejected', 'scheduled'])
      .withMessage("invalid 'status' value. expected: 'open', 'submitted', 'approved', 'published', 'rejected', 'scheduled'"),
  ],

  editStorySchema: [
    check('title')
      .optional()
      .trim()
      .matches(/[a-zA-Z]{3}/)
      .withMessage('story title must contain at least a 3 letter word')
      .isLength({ min: 5, max: 50 })
      .withMessage('story title should be between 5 to 50 characters'),

    check('content')
      .optional()
      .trim()
      .isLength({ min: 50, max: 1024 })
      .withMessage('story body should be between 50 to 1024 characters'),

    check('tag')
      .optional()
      .isArray()
      .withMessage('tag must be an array'),

    check('status')
      .optional()
      .matches(/^(open|submitted)$/)
      .withMessage('Status must be either "open" or "submitted"'),
  ],
};
