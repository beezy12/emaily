// installed stripe.js library to help handle the charge and create a charge object
// check out stripe.js docs here: https://stripe.com/docs/api/node#create_charge
const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);


// this sends our request to the stripe api. returns a promise, so I use async / await
module.exports = app => {
  app.post('/api/stripe', async (req, res) => {
    //console.log(req.body);
    const charge = await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '5 dollars for 5 credits',
      source: req.body.id
    });

    console.log(charge);
  });
};
