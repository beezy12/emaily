const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// ***this is how you fetch something OUT of mongoose, because we don't 'require' it in every file
const User = mongoose.model('users');

// the user logs in through oauth, server says we found a match with that ID, serialize means we are generating a piece of identifying info to put on the cookie to give back to the user in the response.
// the 'user' being passed in here is what we pulled out of the DB in the callback below,
// 'done' is a callback, where the first argument is an error object if we found any. we just return null which says everything is fine.
// user.id is different from the googleId....it is actually the _id that mongo assigned in the db at mlab.
// we only use the profile.id to sign in, and then we don't care about it anymore. after a user has signed in, we only care about our own Id, which is the mongo db Id.
passport.serializeUser((user, done) => {
  done(null, user.id)
});

// the point of deserialize is to take the Id that we stuffed in the cookie, and turn it back into a user model.
// ex: user requests a list from the db. we check the Id from the user, and give them what they want
// first argument is what we stuffed in the cookie earlier...the user.id from the mongo db. second argument is the done function
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});



passport.use(
  new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id }); // checks to see if user record already exists first. this is async

      if (existingUser) {
        return done(null, existingUser);
      }

      const user = await new User({ googleId: profile.id }).save();
      done(null, user);
    }
  )
);


/*
// *** put async in front of the function that will contain some asyncronous code
// *** put await in front of anything that creates a promise
const fetchAlbums = async () => {
    const res = await fetch('https://rallycoding.herokuapp.com/api/music_albums')
    const json = await res.json();
        console.log(json);
}

fetchAlbums();
*/


// ******** this was the OLD googleStrategy
/*
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
                        done(null, existingUser);
                    } else {
                        // we don't have a user record with this ID, make a new record
                        new User({ googleId: profile.id })
                            .save()
                            .then(user => done(null, user));
                    }
                });
        }
    )
);
*/
