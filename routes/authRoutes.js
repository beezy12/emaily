const passport = require('passport');


// I am not importing 'app()' in here, that lives in the index.js file, so I am attaching these two route handlers to the
// app object this way
module.exports = app => {
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
};
