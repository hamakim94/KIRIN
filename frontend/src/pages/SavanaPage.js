import React, { useContext, useEffect, useState } from 'react';
import UseAxios from '../utils/UseAxios';
import styles from './SavanaPage.module.css';
import ChallengeList from '../components/savana/ChallengeList';
import { useLocation } from 'react-router-dom';
import Context from '../utils/Context';
import NewLoading from '../components/common/NewLoading';

function SavanaPage() {
  //랜덤으로 바꾸기
  const [savanaData, setSavanaData] = useState(null);
  const { userData } = useContext(Context);
  const [loading, setLoading] = useState(null);
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const [idx, setIdx] = useState(null);
  useEffect(() => {
    if (location)
      switch (pathname[2]) {
        case '0':
          UseAxios.get(`/challenges?scope=stars&order=random`)
            .then((res) => {
              setSavanaData(res.data);
              setIdx(0);
              setLoading(true);
            })
            .catch(() => setLoading(true));
          break;
        case '1':
          UseAxios.get(`/challenges?scope=stars&order=popularity`)
            .then((res) => {
              const arr = res.data;
              arr.sort(function (a, b) {
                return b.currentNum - a.currentNum;
              });
              setSavanaData(arr);
              let idx = arr.findIndex((el) => el.id === location.state.id);
              setIdx(idx);
              setLoading(true);
            })
            .catch(() => setLoading(true));
          break;
        case '2':
          UseAxios.get(`/challenges?scope=stars&order=latest`)
            .then((res) => {
              setSavanaData(res.data);
              let idx = res.data.findIndex((el) => el.id === location.state.id);
              setIdx(idx);
              setLoading(true);
            })
            .catch(() => setLoading(true));
          break;
        case '3':
          UseAxios.get(`/challenges?scope=general&order=popularity`)
            .then((res) => {
              const newArr = res.data;
              newArr.sort(function (a, b) {
                return b.likeCnt - a.likeCnt;
              });
              let idx = newArr.findIndex((el) => el.id === location.state.id);
              setSavanaData(newArr);
              setIdx(idx);
              setLoading(true);
            })
            .catch(() => setLoading(true));
          break;
        case '4':
          UseAxios.get(`/challenges?scope=all&order=latest`, {
            params: { challengeId: location.state.challengeId },
          })
            .then((res) => {
              setSavanaData(res.data);
              let idx = res.data.findIndex((el) => el.id === location.state.id);
              setIdx(idx);
              setLoading(true);
            })
            .catch(() => setLoading(true));
          break;
        case '5':
          UseAxios.get(`/challenges?scope=all&order=latest&userId=${userData.id}`)
            .then((res) => {
              setSavanaData(res.data);
              let idx = res.data.findIndex((el) => el.id === location.state.id);
              setIdx(idx);
              setLoading(true);
            })
            .catch(() => setLoading(true));
          break;
        case '6':
          UseAxios.get(`/challenges/user/${userData.id}`)
            .then((res) => {
              setSavanaData(res.data);
              let idx = res.data.findIndex((el) => el.id === location.state.id);
              setIdx(idx);
              setLoading(true);
            })
            .catch(() => setLoading(true));
          break;
        case 'challenge':
          UseAxios.get(`/challenges/savana/challenge/${pathname[3]}`)
            .then((res) => {
              const arr = [];
              arr.push(res.data);
              setSavanaData(arr);
              setIdx(0);
              setLoading(true);
            })
            .catch(() => setLoading(true));
          break;
      }
  }, [location]);
  return loading ? (
    userData ? (
      <div id={styles.savana}>
        {savanaData && savanaData.length > 0 ? (
          <ChallengeList styles={styles} data={savanaData} idx={idx}></ChallengeList>
        ) : (
          '기린이 존재하지 않아요 힝힝'
        )}
      </div>
    ) : (
      ''
    )
  ) : (
    <NewLoading></NewLoading>
  );
}

export default SavanaPage;
