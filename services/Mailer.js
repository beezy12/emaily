const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    // these helper functions addContent and addRecipients come from the Mail base class
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  // have to have the extra set of parentheses to do destructuring with an arrow function
  // turns this.recipients into an array of these helper Email objects
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  // take each recipient (this.recipients) and add them to the 'personalize' object, and
  // after they've all been added, call this.addPersonalization, which is a function defined by the
  // Mail base class, and add the entire 'personalize' object
  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);
  }

  // sends email to the Sendgrid api
  async send() {
    try {
      const request = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON()
      });
      const response = await this.sgApi.API(request);
      return response;
    } catch(error) {
      console.log('error', error.response.body);
    }
  }

}

module.exports = Mailer;
