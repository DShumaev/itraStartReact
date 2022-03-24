import React, { useState } from 'react';
// import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useHttp } from '../hooks/http.hook';
import { useAuth } from '../hooks/auth.hook';

const theme = createTheme();

interface PropsType {
  signInBtnHandler: () => void;
  closeUserModal: () => void;
  defaultUserModalState: () => void;
}

type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const SignUp: React.FC<PropsType> = ({
  signInBtnHandler,
  closeUserModal,
  defaultUserModalState,
}) => {
  const { loading, request, error, clearError } = useHttp();
  const { login, logout, token, userId } = useAuth();

  interface UserDataType {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }

  const defaultUserData: UserDataType = {
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const [userDataState, setUserDataState] =
    useState<UserDataType>(defaultUserData);

  const closeUserModalHandler = () => {
    closeUserModal();
    defaultUserModalState();
  };

  const userNameInputHandler = (event: InputEvent): any =>
    setUserDataState(
      (prev: UserDataType): UserDataType => ({
        ...prev,
        userName: event.target.value,
      })
    );

  const firstNameInputHandler = (event: InputEvent): any =>
    setUserDataState((prev: UserDataType) => ({
      ...prev,
      firstName: event.target.value,
    }));

  const lastNameInputHandler = (event: InputEvent): any =>
    setUserDataState((prev: UserDataType) => ({
      ...prev,
      lastName: event.target.value,
    }));

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // реализуем проверку заполненности стэйта и отправку данных
    event.preventDefault();
    const userData: UserDataType = {
      userName: userDataState.userName,
      firstName: userDataState.firstName,
      lastName: userDataState.lastName,
      email: userDataState.email,
      password: userDataState.password,
    };
    console.log(userData);
    const data = await request('/user', 'POST', userData);
    console.log('DATA:');
    console.log(data);

    if (error) {
      // всплывашка что не зарегались
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            opacity: 1,
            background: '#FFF',
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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={userDataState.firstName}
                  onChange={firstNameInputHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={userDataState.lastName}
                  onChange={lastNameInputHandler}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  name="userName"
                  autoComplete="family-name"
                  value={userDataState.userName}
                  onChange={userNameInputHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userDataState.email}
                  onChange={emailInputHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={userDataState.password}
                  onChange={passwordInputHandler}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={signInBtnHandler}>
                  Already have an account? Sign in
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
