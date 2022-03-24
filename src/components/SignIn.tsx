import React, { useState } from 'react';
// import { Avatar, Button, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme } from '@mui/material/styles';
import { useHttp } from '../hooks/http.hook';
import { useAuth } from '../hooks/auth.hook';
import { notification } from './Notification';

const theme = createTheme();

interface PropsType {
  signUpBtnHandler: () => void;
  closeUserModal: () => void;
  defaultUserModalState: () => void;
  loggedUserModalState: () => void;
}

type InputEvent = React.ChangeEvent<HTMLInputElement>;

interface UserDataType {
  password: string;
  email: string;
}

export const SignIn: React.FC<PropsType> = ({
  signUpBtnHandler,
  closeUserModal,
  defaultUserModalState,
  loggedUserModalState,
}) => {
  const { request, error } = useHttp();
  const { login } = useAuth();

  const defaultUserData: UserDataType = {
    password: '',
    email: '',
  };

  const [userDataState, setUserDataState] =
    useState<UserDataType>(defaultUserData);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData: UserDataType = {
      password: userDataState.password,
      email: userDataState.email,
    };
    console.log(userData);
    const data = await request('/user/login', 'POST', userData);
    console.log('DATA:');
    console.log(data);

    //  if (!data || error) {
    //    notification('info', 'User with current data cant\'t log in. /\Please try again');
    //    return;
    // }

    login(data.token, data.userId);
    loggedUserModalState();
    notification('success', 'You are log in successful');
  };

  const emailInputHandler = (event: InputEvent): any =>
    setUserDataState((prev: UserDataType) => ({
      ...prev,
      email: event.target.value,
    }));

  const passwordInputHandler = (event: InputEvent): any =>
    setUserDataState((prev: UserDataType) => ({
      ...prev,
      password: event.target.value,
    }));

  const closeUserModalHandler = () => {
    closeUserModal();
    defaultUserModalState();
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#FFF',
        opacity: 1,
        border: '2px solid #b5b5b5',
        borderRadius: 5,
        boxShadow: 24,
        p: 4,
      }}
    >
      <Button onClick={closeUserModalHandler}>Close</Button>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={userDataState.email}
          onChange={emailInputHandler}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={userDataState.password}
          onChange={passwordInputHandler}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Button onClick={signUpBtnHandler}>
              Don't have an account? Sign Up
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
