const router = require('express').Router();
const dashboard = require('./dashboardRoutes');
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');

// router.use('/', homeRoutes);
// router.use('/dashboard', dashboard);
router.use('/api', apiRoutes);

router.use( (req, res) => {
    res.send(404).end();
})

module.exports = router;