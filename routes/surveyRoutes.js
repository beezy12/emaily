const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thanks', (req, res) => {
    res.send('thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    console.log(req.body);
    res.send({});
  });

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

    // send an email off to the Sengrid api by calling the send function on the Mailer parent class, and then after the async send finishes,
    // save to db. whenever you call save on req.user, that user is now 'stale', so have to create a new user variable
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      // send back the updated user
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};



// title, subject here is really title: title, subject: subject. new es6 syntax you can condense it
// down to one word.
// also doing the same for the mapped 'email' object, but to explicitly say that it's an object, wrap
// it in parentheses. trim() just removes whitespace if someone accidentally added some

// the _user means there it is a relationship property. the survey belongs to this user. and the
// req.user.id is generated by mongoose and mongo
