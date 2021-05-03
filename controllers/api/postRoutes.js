const router = require('express').Router();
const { Post, Comment, User } = require('../../models');

// find all posts and comments 
router.get('/', (req, res) => {
    try {
        const posts = await Post.findAll({
            atributes: [ id, title, post_content, created_at],
            order: [
                ['created_at', 'DESC']
            ],
            include: [
                { 
                model: User,
                atributes: ['name']
            },
            {
                model: Comment,
                atributes: [ id, comment_text, post_id, user_id, created_at],
                include: [
                    {
                        model: User,
                        atributes: ['name']
                    },
                ]
            },
        ],
    })
      res.status(200).json(posts.reverse());
    } catch (err) {
        res.status(500).json(err);
    }
});

// find one user post 
router.get('/:id', async (req, res) => {
    try {
        const postData = await Post.findOne({ 
            where: {
                id: req.params.id
            },
            atributes: [
                id, title, post_content, created_at
            ],
            include: [
                {
                    model: User,
                    atributes: ['name']
                }
            ],
            include: [
                {
                    model: Comment,
                    atributes: [id, comment_text, post_id, user_id, created_at ],
                    include: [ 
                        {
                            model: User,
                            atributes: ['name']
                        }
                    ]
                }
            ]
        })

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {

    try {
        const newPost = await Post.create({ 
            ...req.body,
            title: req.session.title,
            post_content: req.session.title,
            user_id: req.session.user_id 
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

//Update user post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update({ 
            title: req.body.title,
            post_content: req.body.post_content,
            where: {
                id: req.params.id
            }
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Delete user post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;