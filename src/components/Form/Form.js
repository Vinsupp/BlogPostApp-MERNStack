import React, {useState, useEffect} from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import {createPost, updatePost} from '../../actions/posts.js';


const Form = ({currentId, setCurrentId}) => {

    const [postData, setPostData] = useState({ creator:'', title:'', article: '', tags:'', selectedFile: '' });
    const post = useSelector((state)=> currentId? state.posts.find((p)=>p._id===currentId):null);
    const dispatch = useDispatch();    
   
    const classes = useStyles();

    useEffect(()=>{
        if(post){
            setPostData(post);
        }
    },[post])

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, postData));
            clear();
        }else{
            dispatch(createPost(postData));
            clear();
        }
       
    }

    const clear=()=>{
        setCurrentId(null);
        setPostData({creator:'', title:'', article: '', tags:'', selectedFile: ''});
    }
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit = {handleSubmit}>
                <Typography variant="h6">
                    {currentId? 'Edit' : 'Write'} a Blog
                </Typography>
                <TextField 
                    name= "creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth
                    value={postData.creator}
                    onChange={(e)=>setPostData({ ...postData, creator: e.target.value })}                
                />
                <TextField 
                    name= "title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth
                    value={postData.title}
                    onChange={(e)=>setPostData({ ...postData, title: e.target.value })}                
                />
                <TextField 
                    name= "article" 
                    variant="outlined" 
                    label="Article" 
                    fullWidth
                    value={postData.article}
                    onChange={(e)=>setPostData({ ...postData, article: e.target.value })}                
                />
                <TextField 
                    name= "tags" 
                    variant="outlined" 
                    label="Tags" 
                    fullWidth
                    value={postData.tags}
                    onChange={(e)=>setPostData({ ...postData, tags: e.target.value.split(',') })}                
                />

                <div className={classes.fileInput}>
                    <FileBase
                        type="File"
                        multiple={false}
                        onDone={({base64})=>setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" fullWidth type="submit">Submit</Button>
                <Button  variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Cancel</Button>
                
            </form>
        </Paper>
    );
}

export default Form;