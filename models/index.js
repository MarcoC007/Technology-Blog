const User = require('./user');
const Comment = require('./comment');
const Post = require('./post');

User.hasMany(Post, { 
    foreign_key: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    foreign_key: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(Post, {
    foreign_key: 'post_id',
    onDelete: 'CASCADE',
});

Post.hasMany(Comment, {
    foreign_key: 'post_id',
    onDelete: 'CASCADE',
});

Post.belongsTo(User, { 
    foreign_key: 'user_id',
    onDelete: 'CASCADE',
});

Comment.belongsTo(User, { 
    foreign_key: 'user_id',
    onDelete: 'CASCADE',
});

module.exports = {
    User,
    Comment,
    Post
}