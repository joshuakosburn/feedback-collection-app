const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('User');

// After passport.use() is called and finished, the done() within that function calls 
// passport.serializeUser() next with a parameter of the user that we just made.
// This serializeUser() call happens automatically and generates a token for later use.
passport.serializeUser((user, done) => {
    done(null, user.id);
});

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
    (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleID: profile.id })
            .then((user) => {
                if (user) {
                    // User exists
                    done(null, user);
                } else {
                    // User does not exist!
                    new User({googleID: profile.id})
                        .save()
                        .then(user => done(null, user));
                }
        });
    })
);