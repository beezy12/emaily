const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
require('./models/User');
require('./models/Survey');
// don't need to assign passport to a variable because we are not pulling any code out of the passport file, just executing it
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();


/*
MIDDLEWARES - use app.use
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
// calling the route function and passing it the app object
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);



//*** Handling routing in production (in preparation for deploying to heroku):
// this part says: if we don't have a matching route handler above for what the request is looking for, AND
// there's no file inside of our client/build directory that matches what this request is looking for.....
// then just serve up the index.html file
if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets, like main.js or main.css.
  // this is saying: if we don't have an express route handler set up for this, then look in the client/build
  // directory and try to see if there's a file in there that matches what the request is looking for
  app.use(express.static('client/build'));

  // Express will serve up the index.html file if it doesn't recognize the route.
  // basically kicks the user over the
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


// Heroku determines what port we will use
const PORT = process.env.PORT || 5000;
app.listen(PORT);
