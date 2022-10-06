import React from 'react';
import SettingMenu from '../components/setting/SettingMenu';
import Header from '../components/common/Header';
import styles from './SettingPage.module.css';

function SettingPage() {
  return (
    <div className='wrapper'>
      <Header title={'설정'}></Header>
      <SettingMenu styles={styles}></SettingMenu>
    </div>
  );
}

export default SettingPage;
