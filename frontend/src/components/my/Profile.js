import React, { useEffect, useState } from 'react';
import User from './User.json';

function Profile(props) {
  return (
    <div>
      <div className={props.styles.profileBox}>
        <img src={User.img} className={props.styles.userImg}></img>
        <div className={props.styles.userName}>{User.name} </div>
        <button className={props.styles.myWallet}>내지갑</button>
      </div>
    </div>
  );
}

export default Profile;
