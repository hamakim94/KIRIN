import React from 'react';
import styles from './EmailAuthPage.module.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function FailPage() {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.box}>
        <img
          src={require('../assets/img/kirin_logo_nobackground.png')}
          style={{ width: 120 }}
        ></img>
        <div className={styles.title}>로그인에 실패하였습니다:(</div>
        <div>
          토큰이 만료되어, 이메일을 재전송했습니다. <br /> 확인해주세요!
        </div>
      </div>
    </ThemeProvider>
  );
}

export default FailPage;
