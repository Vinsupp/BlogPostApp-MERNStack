import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    article: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        default: new Date()
    },

});

const PostArticle = mongoose.model('PostArticle', postSchema);

export default PostArticle;