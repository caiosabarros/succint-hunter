const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('./data/database');
const app = express();
const passport = require("passport");
const cors = require("cors");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const { isHttpError } = require('http-errors')


const port = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.use(bodyParser.json());
app
    .use(session({
        secret: "secret",
        resave: false,
        saveUninitialized: true,
    }))
    .use(passport.initialize())
    .use(passport.session())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
        );
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
    .use(cors({ methods: ['POST', 'GET', 'DELETE', 'PUT', 'PATCH'] }))
    .use(cors({ origin: '*' }))
    .use('/', require('./routes/index.js'))
    .use((error, req, res, next) => {
        let statusCode = error.statusCode || 500;
        let errorMessage = error.message || "Internal Server Error";
        res.status(statusCode).json({
            error: {
                message: errorMessage
            }
        });
    });

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
    function (accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    done(null, user);
})
app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in ${req.session.user.displayName}` : 'Logged Out') });

app.get('/github/callback',
    (req, res, next) => {
        console.log("GitHub callback hit");
        next();
    },
    passport.authenticate('github', {
        failureRedirect: '/api-docs',
    }),
    (req, res) => {
        req.session.user = req.user;
        req.session.save(err => {
            if (err) {
                console.log("save error:", err);
            }
            res.redirect('/');
        });
    }
);

mongo.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Up on ${port}`);
        });
    }
})