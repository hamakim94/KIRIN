import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../utils/Context';
import WalletModal from '../wallet/WalletModal';
import ProfileImg from '../common/ProfileImg';
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
  const { userData } = useContext(Context);
  return (
    <ThemeProvider theme={theme}>
      <div>
        {userData ? (
          <div className={props.styles.profileBox}>
            <ProfileImg src={userData.profileImg} size={'100px'} />
            <div className={props.styles.userName}>{userData.nickname} </div>
            <div style={{ marginTop: 30, marginBottom: 10 }}>
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
