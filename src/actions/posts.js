import * as api from '../api/index.js';
import { FETCH_ALL, CREATE_POST, UPDATE_POST, DELETE_POST, LIKE_POST } from '../constants/actionTypes';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data});
  } catch (error) {
    console.log(error);
  }
}

export const createPost = (newPostData) => async (dispatch) => {
  try {
    const { data } = await api.creaetPosts(newPostData);
    dispatch({ type: CREATE_POST, payload: data})
  } catch (error) {
    console.log(error);
  }
}

export const updatePost = (currentId, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(currentId, post);
    dispatch({ type: UPDATE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }
}

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE_POST, payload: id});
  } catch (error) {
    console.log(error);
  }
}

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE_POST, payload: data });
  } catch (error) {
    console.log(error);
  }

}