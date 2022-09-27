import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../../utils/Context';

function Profile(props) {
  const navigate = useNavigate();
  const { userData } = useContext(Context);

  return (
    <div>
      <div className={props.styles.profileBox}>
        <img src={`/files/${userData.profileImg}`} className={props.styles.userImg}></img>
        <div className={props.styles.userName}>{userData.nickname} </div>
        <button onClick={() => navigate(`/mypage/wallet`)} className={props.styles.myWallet}>
          내지갑
        </button>
      </div>
    </div>
  );
}

export default Profile;
