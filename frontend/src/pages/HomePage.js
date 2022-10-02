import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import SubscribeList from '../components/home/SubscribeList';
import Category from '../components/common/Category';
import ChallengeList from '../components/home/ChallengeList';
import UseAxios from '../utils/UseAxios';

function HomePage() {
  const [popularityData, setPopularityData] = useState(null);
  const [latestData, setLatestData] = useState(null);
  const [randomData, setRandomData] = useState(null);
  useEffect(() => {
    UseAxios.get('/challenges?scope=stars&order=popularity').then((res) => {
      setPopularityData(res.data);
    });
    UseAxios.get('/challenges?scope=stars&order=latest').then((res) => {
      setLatestData(res.data);
    });
    UseAxios.get('/challenges?scope=general&order=random').then((res) => {
      setRandomData(res.data);
      console.log(res.data);
    });
  }, []);
  return (
    <div className='wrapper'>
      <img
        src={require('../assets/img/kirin_font_logo_.png')}
        style={{ width: 70, marginTop: 5, marginLeft: 15, marginBottom: 15 }}
      ></img>
      <SubscribeList styles={styles}></SubscribeList>
      <hr style={{ border: 'solid 0.5px lightgray' }} />
      <Category title={'인기순'}></Category>
      <ChallengeList styles={styles} data={popularityData}></ChallengeList>
      <img className={styles.img} alt='함께' src={require('../assets/img/together.png')}></img>
      <Category title={'최신순'}></Category>
      <ChallengeList styles={styles} data={latestData}></ChallengeList>
      <img className={styles.img} alt='함께' src={require('../assets/img/together.png')}></img>
      <Category title={'기린기린'}></Category>
      <ChallengeList styles={styles} data={randomData}></ChallengeList>
    </div>
  );
}

export default HomePage;
