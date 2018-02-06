const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// ***this is how you fetch something OUT of mongoose, because we don't 'require' it in every file
const User = mongoose.model('users');


passport.use(
    new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({ googleId: profile.id }) // checks to see if user record already exists first. this is async
                .then((existingUser) => {
                    if (existingUser) {
                        // we already have a record with the given profile ID
                    } else {
                        // we don't have a user record with this ID, make a new record
                        new User({ googleId: profile.id }).save();
                    }
                })
        }
    )
);
