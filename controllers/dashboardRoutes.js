const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/Auth');

//get all posts
router.get('/', withAuth, async (req, res) => {
    try {
       const dbPostData = await Post.findAll( { 
           where: { 
               user_id: req.session.user_id
           },
           attributes: [
               'id', 'title', 'content', 'created_at'
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
                   include: {                       
                       model: User,
                       attributes: ['name']
                    },
               },
               {
                   model: User,
                   attributes: ['name'],
               }
           ],
        });

        const posts = dbPostData.map((post) => post.get({ plain: true }));

        res.render('homepage', { 
            posts, 
            loggedIn: req.session.loggedIn,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//Edit post
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
         const dbPostData = await Post.findOne( req.params.id, {
             attributes: [
                 'id', 
                 'title',
                 'content',
                 'created_at'
             ],
             include: [
                 {
                 model: User,
                 attributes: ['name']
                },
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
                        attributes: ['name']
                }
                }
          ],
         });

         if (!dbPostData) {
             res.status(404).json({ message: 'Not post found with this id'});
         }
         const posts = dbPostData.get({ plain: true });
         res.render('edit-posts', {posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/new', (req, res) => {
    res.render('new-post');
});

module.exports = router;