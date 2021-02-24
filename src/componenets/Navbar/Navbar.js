import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { Typography, AppBar, Toolbar, Avatar, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import useStyles from './styles';
import memories from '../../images/memories.png';

const Navbar = () => {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  useEffect(() => {
    const token = user?.token;
    if(token) {
      const decodeToken = decode(user.token);
      if(decodeToken.exp *1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line
  }, [location]);

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    history.push('/auth');
    setUser(null);
  }
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography className={classes.heading} variant='h2' align='center'>Memories</Typography>
        <img className={classes.image} src={memories} alt='memories' height='60' />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar component={Link} to='/' className={classes.purple} alt={user.result.name} image={user.imageUrl}>{user.result.name.charAt(0)}</Avatar>
            <Typography variant='h6'className={classes.userName}>{user.result.name}</Typography>
            <Button className={classes.logout} variant='contained' color='secondary' onClick={logout} >Logout</Button>
          </div>
        ) : (
          <Button component={Link} to='/auth' variant='contained' color='primary'>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;