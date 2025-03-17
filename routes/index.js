const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.send('Hello!'); // I can place an HTML documentation here explaining how the API works.
})

router.use('/platforms', require('./platforms.js'))
router.use('/projects', require('./projects.js'))

module.exports = router;