import React, { useState } from 'react';
import { Avatar, Button, TextField, Box, Grid, Link, Typography, Container } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LoginTop from '../components/sign/LoginTop';
import styles from './LoginPage.module.css';
import UseAxios from '../utils/UseAxios';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFC947',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

function LoginPage() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let body = {
    email,
    password,
  };

  const onSubmit = () => {
    console.log(body);
    UseAxios.post(`/users/login`, body).then((res) => {
      const accDate = new Date();
      const refDate = new Date();
      accDate.setMinutes(accDate.getMinutes() + 30);
      refDate.setDate(refDate.getDate() + 7);
      cookies.set('accesstoken', res.headers.accesstoken, {
        path: '/',
        secure: true,
        sameSite: 'none',
        expires: accDate,
      });
      cookies.set('refreshtoken', res.headers.refreshtoken, {
        path: '/',
        secure: true,
        sameSite: 'none',
        expires: refDate,
      });
      navigate('/');
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <LoginTop styles={styles}></LoginTop>
      <Container component='main' maxWidth='xs'>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
          <Typography component='h1' variant='h5'></Typography>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            margin='normal'
            required
            fullWidth
            id='email'
            label='이메일'
            name='email'
            autoComplete='email'
            autoFocus
            size='small'
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            margin='normal'
            required
            fullWidth
            name='password'
            label='비밀번호'
            type='password'
            id='password'
            autoComplete='current-password'
            size='small'
          />

          <Button
            type='submit'
            onClick={onSubmit}
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 1 }}
          >
            로그인
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='/findpassword' variant='body2'>
                비밀번호 찾기
              </Link>
            </Grid>
            <Grid item>
              <Link href='/signup' variant='body2'>
                회원가입
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default LoginPage;
