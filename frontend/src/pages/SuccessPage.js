import React from 'react';
import styles from './EmailAuthPage.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material/';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFD046',
    },
  },
});

function SuccessPage() {
  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.box}>
        <img
          src={require('../assets/img/kirin_logo_nobackground.png')}
          style={{ width: 120 }}
        ></img>
        <div className={styles.title}>로그인에 성공하였습니다:)</div>
        <div>
          <div style={{ marginTop: 30, textAlign: 'center' }}>
            <Button
              type='button'
              fullWidth
              variant='contained'
              color='primary'
              size='medium'
              endIcon={<AiOutlineArrowRight />}
              className={styles.btn}
              onClick={() => navigate(`/login`)}
            >
              기린 로그인 페이지 가기
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default SuccessPage;
