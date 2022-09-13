import React, { useEffect, useState } from 'react';
import styles from './MyPage.module.css';
import MyTop from '../components/my/MyTop';
import Profile from '../components/my/Profile';
import MyStar from '../components/my/MyStar';
import MyChallenge from '../components/my/MyChallenge';

function MyPage() {
  return (
    <div>
      <MyTop styles={styles}></MyTop>
      <Profile styles={styles}></Profile>
      <hr></hr>
      <MyStar styles={styles}></MyStar>
      <hr></hr>
      <MyChallenge styles={styles}></MyChallenge>
    </div>
  );
}

export default MyPage;
