import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UseAxios from '../../utils/UseAxios';
import Context from '../../utils/Context';
import styles from '../../pages/CommunityPage.module.css';

function Comment(props) {
  const [newComment, setNewComment] = useState('');

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 15 }}>
      <div
        style={{
          height: 35,
        }}
      >
        <img
          alt='star'
          className={styles.commentImg}
          src={`/files/${props.userData.profileImg}`}
        ></img>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          borderStyle: 'solid',
          flex: 1,
          borderWidth: 0,
          borderBottomWidth: 0.3,
          padding: 8,
          marginLeft: 10,
        }}
      >
        <div style={{ flex: 1, marginRight: 15 }}>{props.userData.name}</div>
      </div>
    </div>
  );
}

export default Comment;
