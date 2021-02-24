import * as api from '../api/index.js';
import { AUTH } from '../constants/actionTypes';

export  const signIn = (formData, history) => async (dispacth) => {
  try {
    const { data } = await api.signIn(formData);
    dispacth({type: AUTH, payload: data });
    await history.push('/');
  } catch (error) {
    console.log(error);
  }
}

export  const signUp = (formData, history) => async (dispacth) => {
  try {
    const { data } = await api.signUp(formData);
    dispacth({type: AUTH, payload: data });
    await history.push('/');
  } catch (error) {
    console.log(error);
  }
}