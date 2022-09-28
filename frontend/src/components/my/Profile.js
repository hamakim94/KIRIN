import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../utils/Context';

function Profile(props) {
  const navigate = useNavigate();
  const { userData } = useContext(Context);
  return (
    <div>
      {userData ? (
        <div className={props.styles.profileBox}>
          <img
            src={
              userData.profileImg
                ? `/files/${userData.profileImg}`
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
            }
            className={props.styles.userImg}
          ></img>
          <div className={props.styles.userName}>{userData.nickname} </div>
          <button onClick={() => navigate(`/mypage/wallet`)} className={props.styles.myWallet}>
            내지갑
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default Profile;
