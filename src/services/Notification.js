const EventEmitter = require('events');
const mail = require('../helpers/mailer');

class Notification extends EventEmitter {
  /**
   * @description create a notification. initialize the event
   */
  constructor() {
    super();
    this.on('notification', this.handleNotification);
  }

  /**
   * @method handleNotification
   *
   * @param {Object} eventPayload - contains notification type and payload
   * @param {String} eventPayload.type - the type of event
   * @param {Object} eventPayload.payload - the event payload
   *
   * @returns {void}
   */
  handleNotification({ type, payload }) {
    if (type in this) return this[type](payload);
  }

  /**
   * @method addNotification
   *
   * @param {String} type - the type of notification
   * @param {Function} notificationHandler - handles defined notification
   *
   * @returns {Notification} instance of notification
   */
  addNotification(type, notificationHandler) {
    if (!(type in this)) this[type] = notificationHandler.bind(this);
  }

  /**
   * @method sendMail
   * @description handles account notification
   *
   * @param {String} type - type of mail being sent
   * @param {Array} payload - message data
   * @param {String} template - email template to use
   */
  async sendEmail(type, payload, template) {
    await mail({ type, payload, template });
    this.emit('notification-sent', { type, payload });

    return { status: 'sent' };
  }

  /**
   * @method accountRequest
   * @description handles notification when a user creates a vendor account
   *
   * @param {Object} payload - contains necessary info to send the notification
   */
  accountCreated(payload) {
    return this.sendEmail('account-created', payload);
  }

  /**
   * @method forgotPassword
   * @description handles notification for password recovery link
   *
   * @param {Array} payload - contains info to send the password reset link
   *
   * @returns {Object} status of event executed
   */
  async forgotPassword(payload) {
    return this.sendEmail('forgot-password', payload);
  }
}

module.exports = new Notification();
