import React from 'react';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container,
} from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FindPasswordTop from '../components/sign/FindPasswordTop';
import styles from './settings/SettingsPage.module.css';

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
function FindPasswordPage() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <FindPasswordTop styles={styles}></FindPasswordTop>
        <img
          src={require('../assets/img/lock.png')}
          alt=''
          width='100'
          height='100'
          style={{ display: 'block', margin: 'auto' }}
        ></img>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>이름과 ID(이메일)을 입력하면 </div>
        <div style={{ textAlign: 'center' }}>이메일 주소로 임시 비밀번호를 보내드립니다.</div>
        <Grid item xs={12}>
          <Typography sx={{ ml: 0.5, mb: 0.5, mt: 5 }}>이메일*</Typography>
          <TextField
            required
            autoFocus
            fullWidth
            type='email'
            id='email'
            name='email'
            placeholder='이메일'
            size='small'
          />
        </Grid>

        <Grid item xs={12} sx={{ mb: 2 }}>
          <Typography sx={{ ml: 0.5, mt: 1, mb: 0.5 }}>이름*</Typography>

          <TextField
            required
            fullWidth
            type='name'
            id='name'
            name='name'
            placeholder='이름'
            size='small'
          />
        </Grid>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          sx={{ mt: 3, mb: 5 }}
          color='primary'
          size='large'
        >
          다음
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default FindPasswordPage;
