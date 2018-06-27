const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    });

    // great place to send an email
    const mailer = new Mailer(survey, surveyTemplate(survey));
    await mailer.send();
  });
};



// title, subject here is really title: title, subject: subject. new es6 syntax you can condense it
// down to one word.
// also doing the same for the mapped 'email' object, but to explicitly say that it's an object, wrap
// it in parentheses. trim() just removes whitespace if someone accidentally added some

// the _user means there it is a relationship property. the survey belongs to this user. and the
// req.user.id is generated by mongoose and mongo
