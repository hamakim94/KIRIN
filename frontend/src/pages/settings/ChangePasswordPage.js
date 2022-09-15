import React from 'react';
import styles from './ChangePasswordPage.module.css';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';

function ChangePasswordPage() {
  return (
    <div>
      <div className={styles.topBox}>
        <a href="/mypage/setting">
          <BiArrowBack className={styles.back}></BiArrowBack>
        </a>
        <div className={styles.pageTitle}>비밀번호 변경</div>
        <div className={styles.fakeSetting}>
          <AiFillSetting></AiFillSetting>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
