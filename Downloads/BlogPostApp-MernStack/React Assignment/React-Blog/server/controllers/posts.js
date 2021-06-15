import  mongoose  from 'mongoose';
import PostArticle from '../models/postArticle.js';


export const getPosts = async (req, res)=>{
    try{
        const postArticles = await PostArticle.find();
        console.log(postArticles);
        res.status(200).json(postArticles);
    }catch(error){
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req, res)=>{
    const post = req.body;

    const newPost = new PostArticle(post)
    try{
        await newPost.save();

        res.status(201).json(newPost);
    }catch(error){
        res.status(409).json({message:error.message});
    }
}

export const updatePost = async (req, res)=>{
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with that id');
    }

    const updatedPost= await PostArticle.findByIdAndUpdate(_id, post, {new: true});

    res.json(updatedPost);

    
}

export const deletePost = async (req, res)=>{
    const {id: _id} = req.params;
    //const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('No post with that id');
    }

    await PostArticle.findByIdAndRemove(_id);

    res.json({message: 'Post Deleted successfully!!'});

    
}

export const likePost = async (req, res)=>{
    const {id} = req.params;
    

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).send('No post with that id');
    }

    const post= await PostArticle.findById(id);
    const updatedPost= await PostArticle.findByIdAndUpdate(id, {likeCount: post.likeCount+1}, {new : true});

    res.json(updatedPost);

    
}