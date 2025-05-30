const { shallowCopy } = require('ethers/lib/utils');
const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Contact API',
        description: "API for retrieving Bug Bounty Projects information from hunter's own custom API"
    },
    host: 'succint-hunter.onrender.com',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);