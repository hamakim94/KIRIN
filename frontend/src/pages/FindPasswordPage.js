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
        <div>로그인에 문제가 있나요?</div>
        <div>이름과 ID(이메일)을 입력하면 작성한 이메일 주소로 임시 비밀번호를 보내드립니다.</div>
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          color="primary"
          size="large"
        >
          다음
        </Button>
      </div>
    </ThemeProvider>
  );
}

export default FindPasswordPage;
