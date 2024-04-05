import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: 'https://images8.alphacoders.com/123/1236170.jpg',
        },
        content: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
        numberOfLikes: {
            type: Number,
            default: 0,
        },
        comments: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true },
);

const Post = mongoose.model('Post', postSchema);

export default Post;
