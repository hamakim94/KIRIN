import React, { useEffect, useState } from 'react';
import User from './User.json';
import { useNavigate } from 'react-router-dom';
import UseAxios from '../../utils/UseAxios';

function Profile(props) {
  const navigate = useNavigate();
  const [user, setUser] = useState([]);

  useEffect(() => {
    UseAxios.get(`/users/profiles`).then((res) => {
      setUser(res.data);
    });
  });

  return (
    <div>
      <div className={props.styles.profileBox}>
        <img src={user.profileImg} className={props.styles.userImg}></img>
        <div className={props.styles.userName}>{user.nickname} </div>
        <button onClick={() => navigate(`/mypage/wallet`)} className={props.styles.myWallet}>
          내지갑
        </button>
      </div>
    </div>
  );
}

export default Profile;
