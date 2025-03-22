const express = require('express')
const bodyParser = require('body-parser')
const mongo = require('./data/database');
const app = express();
const { isHttpError } = require('http-errors')


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
app.use('/', require('./routes'));
app.use((error, req, res, next) => {
    res.status(error.statusCode).json({
        error: {
            message: error.message
        }
    });
})

mongo.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`Up on ${port}`);
        });
    }
})