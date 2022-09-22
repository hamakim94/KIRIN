import React, { useState, useRef } from 'react';
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
import SignupTop from '../components/sign/SignupTop';
import styles from './SignupPage.module.css';

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

function SignupPage() {
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState('');
  // 동의 체크
  const handleAgree = (event) => {
    setChecked(event.target.checked);
  };

  // form 전송
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [Image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  const fileInput = useRef(null);
  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setImage(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      );
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <ThemeProvider theme={theme}>
      <SignupTop styles={styles}></SignupTop>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={Image}
            style={{ marginBottom: '20px', height: '100px', width: '100px', borderStyle: 'solid' }}
            onClick={() => {
              fileInput.current.click();
            }}
          ></Avatar>
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg,impge/png,image/jpeg"
            name="profile_img"
            onChange={onChange}
            ref={fileInput}
          ></input>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <FormControl component="fieldset" variant="standard">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography sx={{ ml: 0.5, mb: 0.5 }}>이메일*</Typography>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    type="email"
                    id="email"
                    name="email"
                    placeholder="이메일"
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ ml: 0.5, mt: 1, mb: 0.5 }}>비밀번호*</Typography>

                  <TextField
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    placeholder="비밀번호"
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
                    placeholder="비밀번호 확인"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ ml: 0.5, mb: 0.5, mt: 1 }}>이름*</Typography>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    name="name"
                    placeholder="이름"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography sx={{ ml: 0.5, mb: 0.5, mt: 1 }}>닉네임*</Typography>
                  <TextField
                    required
                    fullWidth
                    id="nickname"
                    name="nickname"
                    placeholder="닉네임"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox onChange={handleAgree} color="primary" />}
                    label="회원가입에 동의합니다."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                color="primary"
                size="large"
              >
                회원가입
              </Button>
            </FormControl>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignupPage;
