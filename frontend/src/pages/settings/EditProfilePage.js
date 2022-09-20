import React from 'react';
import styles from './EditProfilePage.module.css';
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

function EditProfilePage() {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className={styles.topBox}>
          <a href="/mypage/setting">
            <BiArrowBack className={styles.back}></BiArrowBack>
          </a>
          <div className={styles.pageTitle}>프로필 편집</div>
          <div className={styles.fakeSetting}>
            <AiFillSetting></AiFillSetting>
          </div>
        </div>
        <div>{/* 프로필 이미지 변경 */}</div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography sx={{ ml: 1, mb: 0.5 }}>이메일</Typography>
            <TextField
              required
              autoFocus
              fullWidth
              type="email"
              id="email"
              name="email"
              placeholder="이메일"
              size="small"
              disabled
            />
          </Grid>

          <Grid item xs={12}>
            <Typography sx={{ ml: 1, mb: 0.5, mt: 1.5 }}>이름</Typography>
            <TextField
              required
              fullWidth
              id="name"
              name="name"
              placeholder="이름"
              size="small"
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ ml: 1, mb: 0.5, mt: 1.5 }}>닉네임*</Typography>
            <div>
              <TextField
                required
                fullWidth
                id="nickname"
                name="nickname"
                placeholder="닉네임"
                size="small"
              />
              {/*중복 확인*/}
            </div>
          </Grid>
        </Grid>
        <div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 5 }}
            size="large"
            color="primary"
          >
            프로필 편집
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default EditProfilePage;
