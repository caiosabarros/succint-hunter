const { shallowCopy } = require('ethers/lib/utils');
const swaggerAutogen = require('swagger-autogen');

const doc = {
    info: {
        title: 'Contact API',
        description: 'API for adding contacts from networking'
    },
    host: 'localhost:3000',
    schemes: ['https']
};

const outputFile = './swagger.json';
const endpointFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointFiles, doc);