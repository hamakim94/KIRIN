import React, { useEffect, useState, useRef, useContext } from 'react';
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
import UseAxios from '../../utils/UseAxios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Context from '../../utils/Context';

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
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [newPasswordCheck, setNewPasswordCheck] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const { userData } = useContext(Context);

  /*비밀번호 유효 검사 */
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeNewPassword = (e) => {
    setnewPassword(e.target.value);
  };
  const newPasswordValidation = () => {
    let space = /[~!@#$%";'^,&*()_+|</>=>`?:{[\}]/;
    return !space.test(newPassword) && newPassword.length > 1;
  };
  /*비밀번호 확인 */

  const onChangeNewPasswordCheck = (e) => {
    setNewPasswordCheck(e.target.value);
  };
  const newPasswordCheckValidation = () => {
    return newPassword !== newPasswordCheck && newPasswordCheck.length > 1;
  };

  // let body = {
  //   password,
  //   newPassword,
  // };

  const onSubmit = (data) => {
    const check = () => {
      if (newPassword.length < 8) {
        swal('비밀번호는 8글자 이상이어야 합니다.');
        setCanSubmit(false);
      } else if (newPassword !== newPasswordCheck) {
        swal('비밀번호 확인이 일치하지 않습니다');
        setCanSubmit(false);
      }
      // 현재 비밀번호가 틀렸을 경우 없음
    };
    check();
    console.log(password);
    console.log(newPassword);
    if (canSubmit) {
      UseAxios.put(`/users/change-password`, {
        password: data.password,
        newPassword: data.newPassword,
        userId: userData.userId,
      })
        .then((res) => {
          swal('비밀번호 변경이 완료되었습니다.');
          console.log(res);
          navigate('mypage/setting');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.topBox}>
        <a href="/mypage/setting">
          <BiArrowBack className={styles.back}></BiArrowBack>
        </a>
        <div className={styles.pageTitle}>비밀번호 변경</div>
        <div className={styles.fakeSetting}>
          <AiFillSetting className={styles.fakeSetting}></AiFillSetting>
        </div>
      </div>
      <Container component="main" maxWidth="sm">
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography sx={{ ml: 1, mb: 0.5 }}>현재 비밀번호*</Typography>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="password"
                id="password"
                name="password"
                placeholder="현재 비밀번호"
                onChange={onChangePassword}
                size="small"
                value={password}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography sx={{ ml: 1, mt: 1.5, mb: 0.5 }}>새 비밀번호*</Typography>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="새 비밀번호 입력"
                size="small"
                onChange={onChangeNewPassword}
                error={newPasswordValidation()}
                helperText={
                  newPasswordValidation()
                    ? '영문, 숫자, 특수문자를 조합해 8글자 이상 입력하세요'
                    : ''
                }
                value={newPassword}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant="outlined"
                fullWidth
                type="password"
                id="newPasswordCheck"
                name="newPasswordCheck"
                placeholder="새 비밀번호 확인"
                size="small"
                onChange={onChangeNewPasswordCheck}
                error={newPasswordCheckValidation()}
                helperText={newPasswordCheckValidation() ? '비밀번호가 일치하지 않습니다' : ''}
                value={newPasswordCheck}
              />
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
              onClick={onSubmit}
            >
              비밀번호 변경
            </Button>
          </div>
        </form>
      </Container>
    </ThemeProvider>
  );
}

export default ChangePasswordPage;
