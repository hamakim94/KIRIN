import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import SubscribeList from '../components/home/SubscribeList';
import HomeCategory from '../components/home/HomeCategory';
import ChallengeList from '../components/home/ChallengeList';
import UseAxios from '../utils/UseAxios';
function HomePage() {
  const [popularityData, setPopularityData] = useState(null);
  const [latestData, setLatestData] = useState(null);
  useEffect(() => {
    UseAxios.get('/challenges?scope=stars&order=popularity').then((res) => {
      setPopularityData(res.data);
    });
    UseAxios.get('/challenges?scope=stars&order=latest').then((res) => {
      setLatestData(res.data);
    });
  }, []);
  return (
    <div className='wrapper'>
      <div className={styles.logo}>로고</div>
      <SubscribeList styles={styles}></SubscribeList>
      <HomeCategory title={'인기순'} styles={styles}></HomeCategory>
      <ChallengeList styles={styles} data={popularityData}></ChallengeList>
      <img className={styles.img} alt='함께' src={require('../assets/img/together.png')}></img>
      <HomeCategory title={'최신순'} styles={styles}></HomeCategory>
      <ChallengeList styles={styles} data={latestData}></ChallengeList>
    </div>
  );
}

export default HomePage;
