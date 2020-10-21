const { check } = require('express-validator');

module.exports = {
  createStorySchema: [
    check('headline')
      .exists()
      .trim()
      .withMessage('headline of the story is required')
      .matches(/[a-zA-Z]{3}/)
      .withMessage('headline must contain at least a 3 letter word')
      .isLength({ min: 5, max: 50 })
      .withMessage('headline should be between 5 to 50 characters'),

    check('sections')
      .isArray()
      // .isLength({ min: 1, max: 5 })
      .withMessage('A minimum of 1 and maximum of 5 sections is required'),

    check('tags')
      .optional()
      .isArray()
      .withMessage('tag must be an array'),

    check('status')
      .optional()
      .matches(/^(OPEN|SUBMITTED)$/)
      .withMessage('Status must be either "OPEN" or "SUBMITTED"'),
  ],

  getAllStoriesSchema: [
    check('status')
      .optional()
      .isIn(['OPEN', 'SUBMITTED', 'APPROVED', 'PUBLISHED', 'REJECTED', 'SCHEDULED'])
      .withMessage("invalid 'status' value. expected: 'OPEN', 'SUBMITTED', 'APPROVED', 'PUBLISHED', 'REJECTED', 'SCHEDULED'"),
  ],

  editStorySchema: [
    check('headline')
      .optional()
      .trim()
      .matches(/[a-zA-Z]{3}/)
      .withMessage('story headline must contain at least a 3 letter word')
      .isLength({ min: 5, max: 50 })
      .withMessage('story headline should be between 5 to 50 characters'),

      check('sections')
      .isArray()
      .isLength({ min: 1, max: 5 })
      .withMessage('A minimum of 1 and maximum of 5 sections is required'),

    check('tags')
      .optional()
      .isArray()
      .withMessage('tags must be an array'),

    check('status')
      .optional()
      .matches(/^(OPEN|SUBMITTED)$/)
      .withMessage('Status must be either "OPEN" or "SUBMITTED"'),
  ],
};
