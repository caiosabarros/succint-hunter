const router = require('express').Router();
const path = require('path');

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, path.join('../doc.html')));
})

router.use('/platforms', require('./platforms.js'))
router.use('/projects', require('./projects.js'))

module.exports = router;