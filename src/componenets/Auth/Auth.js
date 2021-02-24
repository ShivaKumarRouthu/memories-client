import React, { useState } from 'react';
import { Container, Paper, Grid, Avatar, Typography, Button } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import useStyles from './styles';
import SignInput from './SignInput';
import Icon from './Icon';
import { signIn, signUp } from '../../actions/auth';

const initFormData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initFormData);

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  }
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const swithSignMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  }

  const handleGoogleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', payload: { result, token }});
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  }

  const handleGoogleFailure = (error) => {
    console.log(error);
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}><LockOutlinedIcon /></Avatar>
        <Typography variant='h5'>{isSignup?'Sign Up':'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>  
            {
              isSignup && (
                <>
                  <SignInput name='firstName' label='First Name' handleChange={handleChange} half autofocus  />
                  <SignInput name='lastName' label='Last Name' handleChange={handleChange} half  />
                </>
              )
            }
            <SignInput name='email' label='Email Address' type='email' handleChange={handleChange} />
            <SignInput name='password' label='Password' type={showPassword ? 'text': 'password'} handleChange={handleChange} handleShowPassword={handleShowPassword} />
            { isSignup && <SignInput name='confirmPassword' type='password' label='Repeat Password' handleChange={handleChange} />}
          </Grid>
          <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
            { isSignup ? 'Sign Up': 'Sign In' }
          </Button>
          <GoogleLogin
            clientId='692346684350-hpvcqif5fr2e8uejqen855ohm2fiidvi.apps.googleusercontent.com'
            render={(renderProps) => (
              <Button
                variant='contained'
                color='primary'
                fullWidth
                className={classes.googleButton}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={handleGoogleSuccess}
            onFailure={handleGoogleFailure}
            cookiePolicy='single_host_origin'
          />
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={swithSignMode}>
                { isSignup?'Already have an account? Sign In': 'Don\'t have an account? Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;