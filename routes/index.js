const router = require('express').Router();
const passport = require('passport');
const path = require('path');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, path.join('../doc.html')));
})

router.use('/platforms', require('./platforms.js'))
router.use('/projects', require('./projects.js'))

router.get('/login', passport.authenticate('github'));
router.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
})

router.get('/auth/status', (req, res) => {
    if (req.session && req.session.user) {
        res.status(200).json({
            isLoggedIn: true,
            user: {
                username: req.session.user.username,
                displayName: req.session.user.displayName,
                profileUrl: req.session.user.profileUrl
            }
        });
    } else {
        res.status(401).json({
            isLoggedIn: false,
            user: null
        });
    }
});




module.exports = router;