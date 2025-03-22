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
    let errorMessage = "An internal error has occurred. Check the parameters you used in this endpoint."
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.statusCode;
        errorMessage = error.message;
    }
    res.status(statusCode).json({
        error: {
            message: errorMessage
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