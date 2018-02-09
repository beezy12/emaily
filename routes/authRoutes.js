const passport = require('passport');


// I am not importing 'app()' in here, that lives in the index.js file, so I am attaching these two route handlers to the
// app object this way
module.exports = app => {
    // not explained well by Passport, but the 'google' string here references the GoogleStrategy under the hood
    // so when you use passport.auth with 'google', it is using the strategy in the passport.js file
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    // so this is the route handler from the strategy in passport.js, after the user has granted permission...this gets the user's code from google and confirms yet again with google. passport does all this for us.
    app.get('/auth/google/callback', passport.authenticate('google'));

    // *** Passport auto attaches the logout function to the req object. logout kills the cookie
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

    // *** Passport automatically attaches the user property to the req object
    app.get('/api/currentUser', (req, res) => {
        res.send(req.user);
    });
};
