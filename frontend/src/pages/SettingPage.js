import React from 'react';
import SettingMenu from '../components/setting/SettingMenu';
import SettingTop from '../components/setting/SettingTop';
import styles from './SettingPage.module.css';

function SettingPage() {
  return (
    <div>
      <SettingTop styles={styles}></SettingTop>
      <SettingMenu styles={styles}></SettingMenu>
    </div>
  );
}

export default SettingPage;
