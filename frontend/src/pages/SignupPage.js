import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
import swal from 'sweetalert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignupTop from '../components/sign/SignupTop';
import styles from './SignupPage.module.css';
import UseAxios from '../utils/UseAxios';
import { useNavigate } from 'react-router-dom';

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

function SignupPage({ parentCallback, emailCallback, nicknameCallback }) {
  const navigate = useNavigate();
  const [width] = useState(window.innerWidth);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [agreement, setAgreement] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState('');

  /* 닉네임 검사 */
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const nicknameValidation = () => {
    return nickname.length > 0 && nickname.length < 2;
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  /* 이메일 검사 */
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const emailValidation = () => {
    let check = /@/;
    return !check.test(email) && email.length > 1;
  };
  /*비밀번호 유효 검사 */
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const passwordValidation = () => {
    return password.length < 6 && password.length > 1;
  };
  /*비밀번호 확인 */
  const onChangePasswordCheck = (e) => {
    setPasswordCheck(e.target.value);
  };
  const passwordCheckValidation = () => {
    return password !== passwordCheck && passwordCheck.length > 1;
  };
  /*약관 확인 */
  const agreementCheck = (e) => {
    if (e.target.checked) setAgreement(true);
    else if (!e.target.checked) setAgreement(false);
  };

  //e: React.FormEvent<HTMLFormElement>
  const sendData = (e) => {
    e.preventDefault();
    if (canSubmit) parentCallback(nickname, email, password, name); // 전달
  };
  /* 이메일 중복 확인 */
  const emailDup = () => {
    emailCallback(email);
  };
  /* 이메일 중복 확인 */
  const nicknameDup = () => {
    nicknameCallback(nickname);
  };

  const [profileImg, setProfileImg] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
  );
  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시
      setProfileImg(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      );
      return;
    }
    //화면에 프로필 사진 표시
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setProfileImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  let body = {
    email,
    password,
    nickname,
    name,
    isCeleb: false,
    walletId: 0,
  };

  const onSubmit = () => {
    if (!email.includes('@')) {
      swal('이메일을 확인해주세요');
      setCanSubmit(false);
    } else if (nickname.length < 2) {
      swal('닉네임을 확인해주세요');
      setCanSubmit(false);
    } else if (agreement === false) {
      swal('개인정보 약관에 동의해주세요');
      setCanSubmit(false);
    } else if (password.length < 6) {
      swal('비밀번호는 6글자 이상이어야합니다.');
      setCanSubmit(false);
    } else if (password !== passwordCheck) {
      swal('비밀번호 확인이 일치하지 않습니다');
      setCanSubmit(false);
    }
    console.log(body);
    UseAxios.post(`/users/signup`, body)

      .then((res) => {
        console.log(res.data);
        navigate('/finishsignup');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*랜더링 */
  return (
    <ThemeProvider theme={theme}>
      <SignupTop styles={styles}></SignupTop>
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            src={profileImg}
            style={{
              marginBottom: '40px',
              height: '100px',
              width: '100px',
              borderStyle: 'solid',
              borderWidth: '2px',
              borderColor: 'grey',
            }}
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

          <div>
            <form onSubmit={sendData}>
              <Grid container spacing={2}>
                <Grid item xs={9} sm={9}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    type="email"
                    onChange={onChangeEmail}
                    value={email}
                    error={emailValidation()}
                    helperText={emailValidation() ? '올바른 이메일형식이 아닙니다' : ''}
                    label="이메일 주소 입력"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    size="small"
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={emailDup}
                    size={width < 600 ? 'small' : 'large'}
                    sx={{ py: 1, mb: 1 }}
                  >
                    {width < 600 ? '확인' : '증복 확인'}
                  </Button>
                </Grid>
                <Grid item xs={9} sm={9}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="nickname"
                    onChange={onChangeNickname}
                    value={nickname}
                    error={nicknameValidation()}
                    helperText={nicknameValidation() ? '닉네임은 두글자 이상이여야 합니다' : ''}
                    label="닉네임 입력"
                    size="small"
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={nicknameDup}
                    size={width < 600 ? 'small' : 'large'}
                    sx={{ py: 1, mb: 1 }}
                  >
                    {width < 600 ? '확인' : '증복 확인'}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    sx={{ mb: 1 }}
                    variant="outlined"
                    required
                    onChange={onChangeName}
                    fullWidth
                    id="name"
                    value={name}
                    label="이름 입력"
                    size="small"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={onChangePassword}
                    value={password}
                    error={passwordValidation()}
                    helperText={passwordValidation() ? '최소 6글자 이상 입력하세요' : ''}
                    name="password"
                    label="비밀번호 입력"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    onChange={onChangePasswordCheck}
                    value={passwordCheck}
                    error={passwordCheckValidation()}
                    helperText={passwordCheckValidation() ? '비밀번호가 일치하지 않습니다' : ''}
                    name="passwordCheck"
                    label="비밀번호 확인"
                    type="password"
                    id="passwordCheck"
                    size="small"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    sx={{ mb: 1, mt: 2 }}
                    control={
                      <Checkbox
                        value={agreement}
                        color="primary"
                        onChange={agreementCheck}
                        sx={{ ml: 0.5 }}
                      />
                    }
                    label="개인정보 수집 및 이용 동의"
                  ></FormControlLabel>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ py: 1 }}
                onClick={onSubmit}
                size={width < 600 ? 'small' : 'large'}
                // onClick={sendData}
                // className={classes.submit}
              >
                회원가입
              </Button>
            </form>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
export default SignupPage;
