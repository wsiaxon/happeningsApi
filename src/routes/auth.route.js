const passport = require('passport');
const { Router } = require('express');
const asyncWrapper = require('../middleware/asyncWrapper');
const { signup, signin, socialLogin, twitterLogin, verifyEmail,
  resendEmailVerification, changePassword, forgotPassword, resetPassword,
} = require('../controllers/auth');
const { verifyToken } = require('../middleware/authentication');
const { signupSchema, signinSchema, changePasswordSchema, emailSchema, passwordSchema } = require('../validations/auth.validators');
const validator = require('../middleware/validator');

const router = Router();

router.post(
  '/register',
  validator(signupSchema),
  asyncWrapper(signup),
);

router.post(
  '/login',
  validator(signinSchema),
  asyncWrapper(signin),
);

router.post(
  '/:provider',
  asyncWrapper(socialLogin),
);

router.post(
  '/resend_email',
  validator(emailSchema),
  asyncWrapper(resendEmailVerification),
);

router.post(
  '/forgot_password',
  validator(emailSchema),
  asyncWrapper(forgotPassword),
);

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email', 'public_profile'] }),
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
  }),
);

router.get(
  '/twitter',
  passport.authenticate('twitter'),
);

router.get(
  '/twitter/redirect',
  passport.authenticate('twitter', { session: false }),
  asyncWrapper(twitterLogin),
);

router.get(
  '/verify_email/:token',
  asyncWrapper(verifyEmail),
);

router.patch(
  '/change_password',
  verifyToken,
  validator(changePasswordSchema),
  asyncWrapper(changePassword),
);

router.patch(
  '/update_password/:id/:token',
  validator(passwordSchema),
  asyncWrapper(resetPassword),
);

module.exports = router;
