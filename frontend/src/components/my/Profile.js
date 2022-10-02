import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../utils/Context';
import WalletModal from '../wallet/WalletModal';
import ProfileImg from '../common/ProfileImg';

function Profile(props) {
  const navigate = useNavigate();
  const { userData } = useContext(Context);
  return (
    <div>
      {userData ? (
        <div className={props.styles.profileBox}>
          <ProfileImg src={userData.profileImg} size={'100px'} />
          <div className={props.styles.userName}>{userData.nickname} </div>
          <WalletModal buttonTitle={'내 지갑'}></WalletModal>
          {/* <button onClick={() => navigate(`/mypage/wallet`)} className={props.styles.myWallet}>
            내지갑
          </button> */}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Profile;
