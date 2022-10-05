import React from 'react';
import styles from './ProfileImg.module.css';

function ProfileImg(props) {
  return (
    <img
      alt='profileImg'
      style={{ width: `${props.size}`, height: `${props.size}`, marginLeft: `${props.left}` }}
      className={styles.img}
      src={
        props.src
          ? `/files/${props.src}`
          : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      }
      onClick={props.onClick}
    ></img>
  );
}

export default ProfileImg;
