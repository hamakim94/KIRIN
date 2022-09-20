import React from 'react';
import styles from './ChangePasswordPage.module.css';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
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
function ChangePasswordPage() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className={styles.topBox}>
          <a href="/mypage/setting">
            <BiArrowBack className={styles.back}></BiArrowBack>
          </a>
          <div className={styles.pageTitle}>비밀번호 변경</div>
          <div className={styles.fakeSetting}>
            <AiFillSetting className={styles.fakeSetting}></AiFillSetting>
          </div>
        </div>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography sx={{ ml: 1, mb: 0.5 }}>현재 비밀번호*</Typography>
              <TextField
                required
                autoFocus
                fullWidth
                type="email"
                id="email"
                name="email"
                placeholder="현재 비밀번호"
                size="small"
              />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ ml: 1, mt: 1.5, mb: 0.5 }}>새 비밀번호*</Typography>
              <TextField
                required
                fullWidth
                type="password"
                id="password"
                name="password"
                placeholder="새 비밀번호 입력"
                size="small"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="password"
                id="rePassword"
                name="rePassword"
                placeholder="새 비밀번호 확인"
                size="small"
              />
            </Grid>
          </Grid>
        </div>
        <div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5 }}
            size="large"
            color="primary"
          >
            비밀번호 변경
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default ChangePasswordPage;
