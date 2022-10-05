import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../utils/Context';
import WalletModal from '../wallet/WalletModal';
import ProfileImg from '../common/ProfileImg';
import UseAxios from '../../utils/UseAxios';
import { Button } from '@mui/material/';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ffc947',
    },
  },
  typography: {
    fontFamily: 'SCD400',
  },
});

function Profile(props) {
  const navigate = useNavigate();
  // // const { userData } = useContext(Context);
  // useEffect(() => {
  //   UseAxios.get(`/users/profiles`).then((res) => {
  //     setUserData(res.data);
  //     // console.log(res.data);
  //   });
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <div>
        {props.userData ? (
          <div className={props.styles.profileBox}>
            <ProfileImg src={props.userData.profileImg} size={'100px'} />
            <div className={props.styles.userName}>{props.userData.nickname} </div>
            <div style={{ marginTop: 15, marginBottom: 10 }}>
              <WalletModal styles={props.styles} buttonTitle={'내 지갑'}></WalletModal>
            </div>
            <Button
              type='button'
              variant='contained'
              onClick={() => navigate(`/dashboard`)}
              className={props.styles.myWallet}
            >
              블록체인 대시보드
            </Button>
          </div>
        ) : (
          ''
        )}
      </div>
    </ThemeProvider>
  );
}

export default Profile;
