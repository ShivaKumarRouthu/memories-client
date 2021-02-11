import axios from 'axios';

const url = process.env.REACT_APP_MEMORIES_SERVICE? process.env.REACT_APP_MEMORIES_SERVICE : 'http://localhost:5000/posts';

export const fetchPosts = () => axios.get(url);
export const creaetPosts = (newPost) => axios.post(url, newPost);
export const updatePost = (id, updatedPost) => axios.patch(`${url}/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/${id}`);
export const likePost = (id) => axios.patch(`${url}/${id}/likepost`);
