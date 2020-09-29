const { config } = require('dotenv');
const debug = require('debug')('dev');
const sgMail = require('@sendgrid/mail');

config();

const templates = {
  'account-created': process.env.SENDGRID_USER_ACTIVATE_ACCOUNT,
  'forgot-password': process.env.SENDGRID_USER_FORGOT_PASSWORD,
};

module.exports = async ({ type, payload, template }) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    template = template || templates[type];
    if (!template) throw new Error('email template not available');

    if (!Array.isArray(payload)) throw new Error('mail data should be an array');

    const messagePayload = payload.map((singleEmailData) => {
      const { email } = singleEmailData;

      return {
        to: email,
        from: process.env.SENDGRID_EMAIL,
        templateId: template,
        dynamic_template_data: { ...singleEmailData },
      };
    });

    await sgMail.send(messagePayload);
  } catch (error) {
    debug(`mailer: ${error}`);
    return error;
  }

  return { message: 'email sent' };
};
