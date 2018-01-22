const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('accesstoken', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile:', profile);
    })
);

// not explained well by Passport, but the 'google' string here references the GoogleStrategy under the hood
// so when you passport.auth with 'google', it is using the strategy above
app.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

// so this is the route handler from our strategy above, after the user has granted permission...this gets the user's code from
// google and confirms yet again with google. passport does all this for us.
app.get('/auth/google/callback', passport.authenticate('google'));


// Heroku determines what port we will use
const PORT = process.env.PORT || 5000;
app.listen(PORT);
