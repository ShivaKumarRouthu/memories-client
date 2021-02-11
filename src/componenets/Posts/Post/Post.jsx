import React from 'react';
import { useDispatch } from 'react-redux';

import { Card, CardContent, CardMedia, CardActions, Typography, Button } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';

import useStyles from './styles';
import { deletePost, likePost } from '../../../actions/posts';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleDeletePost = () => {
    dispatch(deletePost(post._id));
  }

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile} />
      <div className={classes.overlay}>
        <Typography variant='h6'>{post.create}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      <div className={classes.overlay2}>
        <Button style={{color: 'white'}} size='small' onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize='default' /></Button>
      </div>
      <div className={classes.details}>
        <Typography variant='body2' color='textSecondary' component='h2'>{post.tags.map((tag) => (`#${tag} `))}</Typography>
      </div>
      <Typography variant='h5' className={classes.title}>{post.title}</Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size='small' color='primary' onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon />&nbsp;Like&nbsp;{post.likeCount}</Button>
        <Button size='small' color='primary' onClick={handleDeletePost}><DeleteIcon /> Delete</Button>
      </CardActions>
    </Card>
  )
}

export default Post;