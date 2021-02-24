import React, { useState, useEffect } from 'react';
import { Paper, Typography, Button, TextField } from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId}) => {
  const defaultPost = {
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  };
  const classes = useStyles();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.posts.find((p) => p._id === currentId));
  const [postData, setPostData] = useState(defaultPost);
  const user = JSON.parse(localStorage.getItem('profile'));

  useEffect(() => {
    if(post) setPostData(post);
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(currentId) {
      dispatch(updatePost(currentId, {...postData,  name: user?.result?.name}));
    } else {
      dispatch(createPost({...postData,  name: user?.result?.name}));
    }
    setPostData(postData);
    clearForm();
  }

  const clearForm = () => {
    setPostData(defaultPost);
    setCurrentId(null);
  }

  if(!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sing In to create new posts
        </Typography>
      </Paper>
    )
  }
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate onSubmit={(e) => handleSubmit(e)} className={`${classes.root} ${classes.form}`}>
        <Typography variant='h6'>{currentId? 'Editing' : 'Creating'} a Memories</Typography>
        <TextField fullWidth variant='outlined' name='title' label='Title' value={postData.title} onChange={(e) => setPostData({...postData, title: e.target.value})} />
        <TextField fullWidth variant='outlined' name='message' label='Message' value={postData.message} onChange={(e) => setPostData({...postData, message: e.target.value})} />
        <TextField fullWidth variant='outlined' name='tags' label='Tags' value={postData.tags} onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})} />
        <div className={classes.fileInput}><FileBase type='file' onDone={({ base64 }) => setPostData({...postData, selectedFile: base64})} /></div>
        <Button className={classes.buttonSubmit} type='submit' variant='contained' color='primary' size='large' onSubmit={handleSubmit} fullWidth>Submit</Button>
        <Button type='button' variant='contained' color='secondary' size='small' onClick={clearForm} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}

export default Form;