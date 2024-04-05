import Post from '../models/post.model.js';
import User from '../models/user.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
    try {
        const { content, image } = req.body;
        const { id } = req.user;

        const user = await User.findById(id);
        if (!content) {
            return next(errorHandler(400, 'Vui lòng nhập đầy đủ các trường!'));
        }

        const newPost = new Post({
            userId: id,
            username: user.username,
            profilePicture: user.profilePicture,
            content,
            image,
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};

export const see = async (req, res, next) => {
    try {
        const posts = await Post.find({}).sort({
            createdAt: -1,
        });
        res.status(201).json(posts);
    } catch (error) {
        next(error);
    }
};

export const seeUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId }).sort({
            createdAt: -1,
        });
        res.status(201).json(posts);
    } catch (error) {
        next(error);
    }
};

export const seePost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.findById({ _id: id });

        if (!posts || posts.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};

// Create comment
export const createComment = async (req, res, next) => {
    const { postId } = req.params;
    const { comment } = req.body;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return next(errorHandler(400, 'Post not found!'));
        }
        post.comments.push({
            userId: req.user.id,
            content: comment,
        });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(404).json({ message: 'Post not found' });
        } else {
            next(error);
        }
    }
};
