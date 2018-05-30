const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
// don't need to assign passport to a variable because we are not pulling any code out of the passport file, just executing it
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();


/*
MIDDLEWARES
middlewares use app.use
*/

//express doesn't parse the request automatically, need bodyParser to create the req.body object
app.use(bodyParser.json());

// we also have to tell Passport to handle our authentication by using cookies to keep track of the currently signed in user
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// this require was assigned to a variable, but the variable is not needed. this is a way of writing it.
// authRoutes returns a function, so what this is doing is immediately calling that function and passing app to it.
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);


// Heroku determines what port we will use
const PORT = process.env.PORT || 5000;
app.listen(PORT);
