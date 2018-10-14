// installed stripe.js library to help handle the charge and create a charge object
// check out stripe.js docs here: https://stripe.com/docs/api/node#create_charge
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

// this sends our request to the stripe api. returns a promise, so I use async / await
// express doesn't care how many functions (middlewares) you add in (like requireLogin below), just one of the
// functions has to process the request and send back a request to the user.
module.exports = app => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    // this will show in the terminal
    //console.log(req.body);

    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '5 dollars for 5 credits',
      source: req.body.id
    });
    //console.log(charge);

    req.user.credits += 5;
    const user = await req.user.save()

    res.send(user);
  });
};
