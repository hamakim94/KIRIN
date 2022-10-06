import React, { useContext, useEffect, useState } from 'react';
import styles from './MyPage.module.css';
import MyTop from '../components/my/MyTop';
import Profile from '../components/my/Profile';
import MyStar from '../components/my/MyStar';
import { useNavigate, useLocation } from 'react-router-dom';
import Category from '../components/common/Category';
import UseAxios from '../utils/UseAxios';
import Context from '../utils/Context';
import ChallengeList from '../components/home/ChallengeList';
import NewLoading from '../components/common/NewLoading';

function MyPage() {
  const [isParticipated, setIsParticipated] = useState(true);
  const [participatedData, setParticipatedData] = useState(null);
  const [likedData, setLikedData] = useState(null);
  const [loading1, setLoading1] = useState(null);
  const [loading2, setLoading2] = useState(null);
  const [loading3, setLoading3] = useState(null);
  const [loading4, setLoading4] = useState(null);
  const [user, setUser] = useState(null);
  const [subs, setSubs] = useState([]);
  const { userData } = useContext(Context);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (userData) {
      UseAxios.get(`/challenges/user/${userData.id}`)
        .then((res) => {
          setLikedData(res.data);
          setLoading1(true);
        })
        .catch(() => setLoading1(true));
      UseAxios.get(`/challenges?scope=all&order=latest&userId=${userData.id}`)
        .then((res) => {
          res.data.reverse();
          setParticipatedData(res.data);
          setLoading2(true);
        })
        .catch(() => setLoading2(true));
      UseAxios.get(`/users/subscribes`)
        .then((res) => {
          setSubs(res.data);
          setLoading3(true);
        })
        .catch(() => setLoading3(true));
      UseAxios.get(`/users/profiles`)
        .then((res) => {
          setUser(res.data);
          setLoading4(true);
        })
        .catch(() => setLoading4(true));
    }
  }, [userData]);

  return loading1 && loading2 && loading3 && loading4 ? (
    userData ? (
      <div className='wrapper'>
        <MyTop styles={styles} state={location.state}></MyTop>
        <Profile styles={styles} userData={user}></Profile>
        {/* <hr></hr> */}
        <MyStar styles={styles} subs={subs}></MyStar>
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
          <ChallengeList data={participatedData} category={5}></ChallengeList>
        ) : (
          <ChallengeList data={likedData} category={6}></ChallengeList>
        )}
        {/* <button onClick={() => navigate(`/create/deploy`)} className={styles.myWallet}>
        컨트랙트 배포하기
      </button> */}
        {/* <button onClick={() => navigate(`/create`)} className={styles.myWallet}>
        등록하기
      </button> */}
      </div>
    ) : (
      ''
    )
  ) : (
    <NewLoading></NewLoading>
  );
}

export default MyPage;
