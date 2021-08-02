const passport = require('passport');
const router = require('express').Router();

router
.get(
    '/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
).get(
    '/auth/google/callback',
    passport.authenticate('google')
).get(
    '/api/current_user',
    (req, res) => {
        res.send(req.user);
    }
).get(
    '/api/logout',
    (req, res) => {
        req.logout();
        res.send(req.user);
    }
);

module.exports = router;