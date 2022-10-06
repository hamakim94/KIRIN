import React from 'react';
import { Button } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { BsCheckLg } from 'react-icons/bs';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD046',
    },
  },
  typography: {
    fontFamily: 'SCD400',
  },
});

function FinishSignupPage() {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <div style={{ height: 360, top: '50%', marginTop: 180, textAlign: 'center' }}>
        <BsCheckLg size='110' color='#FFD046' />
        <div style={{ marginTop: 50, fontSize: 20 }}>
          <div style={{ marginBottom: 10 }}>회원가입이 완료되었습니다.</div>
          <div>이메일 인증 후 로그인해주세요.</div>
        </div>
        <div style={{ marginTop: 80 }}>
          <Button
            type='button'
            fullWidth
            variant='contained'
            color='primary'
            size='medium'
            endIcon={<AiOutlineArrowRight />}
            style={{
              width: '80%',
              maxWidth: '450px',
              fontSize: 'larger',
              fontWeight: 'bold',
              marginBottom: 50,
            }}
            onClick={() => navigate(`/login`)}
          >
            기린 로그인 페이지 가기
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default FinishSignupPage;
