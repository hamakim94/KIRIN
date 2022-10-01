import React, { useEffect, useState, useRef } from 'react';

import { Avatar, Button, TextField, Grid, Box, Typography, Container } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import UseAxios from '../../utils/UseAxios';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/common/Header';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFC947',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
  typography: {
    fontFamily: 'SCD400',
  },
});

function EditProfilePage({ parentCallback }) {
  const navigate = useNavigate();
  const [width] = useState(window.innerWidth);
  const [nickname, setNickname] = useState('');
  const [nicknameChecked, setNicknameChecked] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [file, setFile] = useState(null);
  const [user, setUser] = useState([]);
  const [profileImg, setProfileImg] = useState(null);

  useEffect(() => {
    UseAxios.get(`/users/profiles`).then((res) => {
      setUser(res.data);
      setProfileImg(`${process.env.REACT_APP_BASEURL}/files/${res.data.profileImg}`);
      console.log(res.data);
    });
  }, []);

  const sendData = (e) => {
    e.preventDefault();
    if (canSubmit) parentCallback(nickname); // 전달
  };

  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };
  const nicknameValidation = () => {
    return nickname.length > 0 && nickname.length < 2;
  };

  const nicknameDup = (e) => {
    if (nickname.length > 0) {
      UseAxios.get(`/users/check-duplicate/nickname`, { params: { nickname: e.target.value } })
        .then((res) => {
          swal('', '확인되었습니다.');
          setNicknameChecked(true);
          setCanSubmit(true);
        })
        .catch((err) => {
          swal('', '사용 중인 닉네임입니다.');
          setNicknameChecked(false);
        });
    } else {
      swal('', '닉네임을 입력해 주세요.');
      setNicknameChecked(false);
    }
  };

  const fileInput = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    } else {
      //업로드 취소할 시

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

  const onSubmit = () => {
    const check = () => {
      if (nicknameChecked === false) {
        swal('닉네임 중복 확인을 진행해주세요.');
        setCanSubmit(false);
      }
    };
    check();
    const data = new FormData();
    data.append('profileImg', file);
    // data.append('userDTO', new Blob([JSON.stringify(body)]), { type: 'application/json' });
    data.append('nickname', nickname);

    if (canSubmit) {
      UseAxios.put(`/users/profiles`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((res) => {
          swal('프로필 편집이 완료되었습니다.');
          navigate('');
          console.log('완료');
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className='wrapper'>
      <ThemeProvider theme={theme}>
        <Header title={'프로필 편집'}></Header>
        <Container component='main' maxWidth='sm'>
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
            <form>
              <input
                type='file'
                style={{ display: 'none' }}
                accept='image/jpg,impge/png,image/jpeg'
                name='profile_img'
                onChange={onChange}
                ref={fileInput}
              ></input>
            </form>
            <form onSubmit={sendData}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography sx={{ ml: 1, mb: 0.5 }}>이메일*</Typography>
                  <TextField
                    required
                    fullWidth
                    type='email'
                    id='email'
                    name='email'
                    placeholder={user.email}
                    size='small'
                    disabled
                  ></TextField>
                </Grid>

                <Grid item xs={12}>
                  <Typography sx={{ ml: 1, mb: 0.5, mt: 1 }}>이름*</Typography>
                  <TextField
                    required
                    fullWidth
                    id='name'
                    name='name'
                    placeholder={user.name}
                    size='small'
                    disabled
                  />
                </Grid>
                <Grid item xs={9} sm={9}>
                  <Typography sx={{ ml: 1, mb: 0.5, mt: 1 }}>닉네임*</Typography>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='nickname'
                    onChange={onChangeNickname}
                    value={nickname}
                    error={nicknameValidation()}
                    helperText={nicknameValidation() ? '닉네임은 두글자 이상이여야 합니다' : ''}
                    placeholder={user.nickname}
                    size='small'
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <Typography sx={{ ml: 1, mb: 0.5, mt: 1 }} style={{ color: 'white' }}>
                    닉네임*
                  </Typography>
                  <Button
                    type='button'
                    fullWidth
                    variant='contained'
                    color='primary'
                    onClick={nicknameDup}
                    value={nickname}
                    size={width < 600 ? 'small' : 'large'}
                    sx={{ py: 1, mb: 1 }}
                  >
                    {width < 600 ? '확인' : '증복 확인'}
                  </Button>
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                sx={{ py: 1, mt: 5 }}
                onClick={onSubmit}
                size={width < 600 ? 'small' : 'large'}
              >
                프로필 편집
              </Button>
            </form>
          </Box>
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default EditProfilePage;
