import React, { useContext } from 'react';
import CommunityContent from '../components/community/CommunityContent';
import Context from '../utils/Context';
import styles from './CommunityCreatePage.module.css';

function CommunityCreatePage() {
  const { userData } = useContext(Context);
  const areaRef = useRef(null);
  let textarea = document.querySelector('.autoTextarea');

  if (textarea) {
    textarea.style.height = 'auto';
    let height = textarea.scrollHeight; // 높이
    textarea.style.height = `${height + 8}px`;
  }
  return (
    <div className='wrapper'>
      <div className={styles.writerWrapper}>
        <div>
          <img alt='star' className={styles.starImg} src={`/files/${userData.profileImg}`}></img>
        </div>
        <div className={styles.nameWrapper}>
          <b>{userData.nickname}</b>
          <span className={styles.writeDate}>시간</span>
        </div>
      </div>
      <div className={styles.midWrapper}>
        <textarea
          className='autoTextarea'
          ref={areaRef}
          style={{ width: '100%', border: 0, fontSize: 16 }}
        ></textarea>
        <div></div>
        <div>
          <img></img>
        </div>
      </div>
    </div>
  );
}

export default CommunityCreatePage;
