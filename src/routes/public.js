import express from 'express';
import validate from 'express-validation';
import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';

const router = express.Router();

//= ===============================
// Public routes
//= ===============================

router.post(
  '/register',
  validate(userValidator.register),
  userController.register,
);

router.post(
  '/login',
  validate(userValidator.login),
  userController.login,
);

router.get(
  '/home',
  // validate(userValidator.login),
  (req, res, next) => res.send('Home Page'),
);

module.exports = router;
