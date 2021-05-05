const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/Auth');

// Get all the post 
router.get('/', async (req, res) => {
    try {
        console.log('hello')
        const postData = await Post.findAll({ 
            attributes: [ 'id', 'title', 'content', 'created_at'],
            include: [
                { 
                    model: Comment,
                    attributes: [
                        'id', 
                        'comment_text', 
                        'post_id', 
                        'user_id', 
                        'created_at'
                    ],
                    include: { 
                        model: User,
                        attributes: ['name'],
                    },
                },
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Get one posts
router.get('/post/:id', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findByPk(req.params.id, {

        attributes: [
            'id', 
            'title', 
            'content', 
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [
                     'id',
                     'comment_text',
                     'post_id',
                     'user_id',
                     'created_at'
                ],
                include:{
                    model: User,
                    attributes: ['name'],
                }
            },
            {
                model: User,
                attributes: ['name'],
            }
            ]
        });

        if (!dbPostData) {
            res.status(404).json({ message: 'Not post found with this id'});
            return;
        }
        const post = dbPostData.get({ plain: true });
        res.render('posts', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Get comments
router.get('/post-comments', async (req, res) => {
    try {
        const dbPostData = await Post.findByPk( req.params.id, {
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: [ 
                    'id',
                    'comment_text',
                    'post_id',
                    'user_id',
                    'created_at',
                ],
                include: {
                    model: User,
                    attributes: ['name']
                }
            },
            {
                model: User,
                attributes: ['name']
            }
        ]
        });

        if (!dbPostData) {
            res.status(404).json({ message: 'Not comment found with this id'})
        }
        const post = dbPostData.get({ plain: true });
        res.render('post-comments', {post, loggedIn: req.session.loggedIn});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//login route

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/login');
        return;
    }

    res.render('login');
});
module.exports = router;