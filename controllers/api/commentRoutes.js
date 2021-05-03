const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/Auth');

// Getting all comments
router.get('/' , (req, res) => {
   
    try {
        const allComments = await Comment.findAll({});
        
        res.status(200).json(allComments);
    } catch (err) {
        res.status(400).json(err);
    }

});

router.post('/', withAuth, async (req, res) => {

    try {
        const newComment = await Comment.create({ 
            ...req.body,
         comment_text: req.session.comment_text,
         post_id: req.session.post_id,
         user_id: req.session.user_id
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Update user comments

router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update({
            comment_text: req.body.comment_text,
            where: {
                id: req.params.id
            },
        });
        
        if (!commentData) {
            res.status(404).json({ message: 'No comment found with this id'});
            return;
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete user comments

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update({
            where: {
                id: req.params.id
            },
        });

        if (!commentData) {
            res.status(404).json({ message: 'No comments found with this id'});
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;