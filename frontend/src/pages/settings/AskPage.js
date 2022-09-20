import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import styles from './SettingsPage.module.css';

function AskPage() {
  return (
    <div>
      <div className={styles.topBox}>
        <a href="/mypage/setting">
          <BiArrowBack className={styles.back}></BiArrowBack>
        </a>
        <div className={styles.pageTitle}>문의하기</div>
        <div>
          <AiFillSetting className={styles.fakeSetting}></AiFillSetting>
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>급한 용무는 개인적으로 연락 부탁드립니다.</div>
    </div>
  );
}

export default AskPage;
