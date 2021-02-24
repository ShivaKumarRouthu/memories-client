import React from 'react';
import { Grid, TextField, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const SignInput = ({ name, label, type, handleChange, autofocus, half, handleShowPassword }) => {

  return (
    <Grid item xs={12} sm={ half? 6: 12 } >
      <TextField
        name={name}
        onChange={handleChange}
        autoFocus={autofocus}
        label={label}
        type={type}
        variant='outlined'
        required
        fullWidth
        InputProps={ name === 'password' ? {
          endAdornment:(
            <InputAdornment position='end'>
              <IconButton onClick={handleShowPassword}>
                {type === 'password'? <VisibilityOff />:<Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }:null}
      />
    </Grid>
  );
}

export default SignInput;