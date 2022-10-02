import React, { useContext, useEffect, useState } from 'react';
import styles from './MyPage.module.css';
import MyTop from '../components/my/MyTop';
import Profile from '../components/my/Profile';
import MyStar from '../components/my/MyStar';
import { useNavigate } from 'react-router-dom';
import Category from '../components/common/Category';
import UseAxios from '../utils/UseAxios';
import Context from '../utils/Context';
import ChallengeList from '../components/home/ChallengeList';

function MyPage() {
  const [isParticipated, setIsParticipated] = useState(true);
  const [participatedData, setParticipatedData] = useState(null);
  const [likedData, setLikedData] = useState(null);
  const { userData } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    UseAxios.get(`/challenges/participate`).then((res) => {
      setParticipatedData(res.data);
    });
  }, []);
  useEffect(() => {
    if (userData) {
      UseAxios.get(`/challenges/user/${userData.id}`).then((res) => {
        setLikedData(res.data);
      });
    }
  }, [userData]);

  return userData ? (
    <div className='wrapper'>
      <MyTop styles={styles}></MyTop>
      <Profile styles={styles}></Profile>
      <hr></hr>
      <MyStar styles={styles}></MyStar>
      <hr></hr>
      <div className={styles.titleBox}>
        <Category title={'챌린지'}></Category>
        <div className={styles.sortTab}>
          {isParticipated ? (
            <span style={{ color: '#ffc947' }}>참여</span>
          ) : (
            <span onClick={() => setIsParticipated(true)}>참여</span>
          )}
          {isParticipated ? (
            <span onClick={() => setIsParticipated(false)}>좋아요</span>
          ) : (
            <span style={{ color: '#ffc947' }}>좋아요</span>
          )}
        </div>
      </div>
      {isParticipated ? (
        <ChallengeList data={participatedData}></ChallengeList>
      ) : (
        <ChallengeList data={likedData}></ChallengeList>
      )}
      <hr></hr>
      <button onClick={() => navigate(`/dashboard`)} className={styles.myWallet}>
        블록체인 대시보드
      </button>
      <button onClick={() => navigate(`/create/deploy`)} className={styles.myWallet}>
        컨트랙트 배포하기
      </button>
      <button onClick={() => navigate(`/create`)} className={styles.myWallet}>
        등록하기
      </button>
    </div>
  ) : (
    ''
  );
}

export default MyPage;
