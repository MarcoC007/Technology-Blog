const router = require('express').Router();
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/commenst', commentRoutes);
router.use('/post', postRoutes);

module.exports = router;