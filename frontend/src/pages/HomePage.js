import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import SubscribeList from '../components/home/SubscribeList';
import Category from '../components/common/Category';
import ChallengeList from '../components/home/ChallengeList';
import UseAxios from '../utils/UseAxios';
import NewLoading from '../components/common/NewLoading';

function HomePage() {
  const [popularityData, setPopularityData] = useState(null);
  const [latestData, setLatestData] = useState(null);
  const [randomData, setRandomData] = useState(null);
  const [starData, setStarData] = useState(null);
  const [loading1, setLoading1] = useState(null);
  const [loading2, setLoading2] = useState(null);
  const [loading3, setLoading3] = useState(null);
  const [loading4, setLoading4] = useState(null);
  useEffect(() => {
    UseAxios.get('/challenges?scope=stars&order=popularity')
      .then((res) => {
        const arr = res.data;
        arr.sort(function (a, b) {
          return b.currentNum - a.currentNum;
        });
        setPopularityData(arr);
        setLoading1(true);
        // console.log(arr);
      })
      .catch(() => setLoading1(true));
    UseAxios.get('/challenges?scope=stars&order=latest')
      .then((res) => {
        setLatestData(res.data);
        setLoading2(true);
      })
      .catch(() => setLoading2(true));
    UseAxios.get('/challenges?scope=general&order=popularity')
      .then((res) => {
        const arr = res.data;
        arr.sort(function (a, b) {
          return b.likeCnt - a.likeCnt;
        });
        setRandomData(arr);
        setLoading3(true);
      })
      .catch(() => setLoading3(true));
    UseAxios.get(`/users/subscribes`)
      .then((res) => {
        setStarData(res.data);
        setLoading4(true);
      })
      .catch(() => setLoading4(true));
  }, []);
  return loading1 && loading2 && loading3 && loading4 ? (
    <div className='wrapper'>
      <img
        src={require('../assets/img/kirin_font_logo_.png')}
        style={{ width: 67, marginTop: 15, marginLeft: 15, marginBottom: 10 }}
      ></img>
      <SubscribeList styles={styles} starData={starData}></SubscribeList>
      {/* <hr style={{ border: 'solid 0.1px #C9C9C9' }} /> */}
      <Category title={'인기순'}></Category>
      <ChallengeList styles={styles} data={popularityData} category={1}></ChallengeList>
      <img className={styles.img} alt='함께' src={require('../assets/img/ssafmygirl2.png')}></img>
      <Category title={'최신순'}></Category>
      <ChallengeList styles={styles} data={latestData} category={2}></ChallengeList>
      <img className={styles.img} alt='함께' src={require('../assets/img/blockchain3.png')}></img>
      <Category title={'기린기린'}></Category>
      <ChallengeList styles={styles} data={randomData} category={3}></ChallengeList>
    </div>
  ) : (
    <NewLoading></NewLoading>
  );
}

export default HomePage;
