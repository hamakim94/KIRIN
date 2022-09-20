import React from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import styles from './ChangePasswordPage.module.css';

function TermsOfServicePage() {
  return (
    <div>
      <div className={styles.topBox}>
        <a href="/mypage/setting">
          <BiArrowBack className={styles.back}></BiArrowBack>
        </a>
        <div className={styles.pageTitle}>서비스 이용약관</div>
        <div>
          <AiFillSetting className={styles.fakeSetting}></AiFillSetting>
        </div>
      </div>
    </div>
  );
}

export default TermsOfServicePage;
