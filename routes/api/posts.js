const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const Post = require('../../modules/Post');
const Profile = require('../../modules/Profiles');
const auth = require('../../middleware/auth');
const User = require('../../modules/User');

//add post
//register a post by loged in user
router.post('/', [auth, [
    check('text', 'text is required').notEmpty()
]], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        })

        const post = await newPost.save();

        res.json(post);

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error');
    }

});

//get all posts

router.get('/', auth, async (req, res) => {
    try {
        //desc order by date at latest
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//get post by id 

router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ msg: 'post not found' })
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'post not found' })
        }
        res.status(500).send('Server Error');
    }
})

//delete post by id 

router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(400).json({ msg: 'post not found' });
        }

        if (post.user.toString() != req.user.id) {
            return res.status(401).json({ msg: 'user not authorised' })
        }
        await post.remove();
        res.json({ msg: 'post deleted' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'post not found' });
        }
        res.status(500).send('Server Error');
    }
})

//like a post by any user

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: ' post already liked' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
})

//post unlike by id

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'user not liked this post' });
        }

        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post.likes);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})


//post a comment on posts

router.post('/comment/:id', [auth, [
    check('text', 'text is required').notEmpty()
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const comment = {
            name: user.name,
            text: req.body.text,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(comment);
        await post.save();

        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})

//delete comment

router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        if (!comment) {
            return res.status(400).json({ msg: 'comment does not exists' });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'user not authorized' });
        }

        const removeindex = post.comments.map(comment => comment.id).indexOf(req.params.comment_id);

        post.comments.splice(removeindex, 1);

        await post.save();

        res.json(post.comments)

    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})

module.exports = router;