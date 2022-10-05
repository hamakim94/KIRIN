import React, { useContext, useEffect, useState } from 'react';
import UseAxios from '../utils/UseAxios';
import styles from './SavanaPage.module.css';
import ChallengeList from '../components/savana/ChallengeList';
import { useLocation } from 'react-router-dom';
import Context from '../utils/Context';

function SavanaPage() {
  //랜덤으로 바꾸기
  const [savanaData, setSavanaData] = useState(null);
  const { userData } = useContext(Context);
  const location = useLocation();
  const pathname = location.pathname.split('/');
  const [idx, setIdx] = useState(null);
  useEffect(() => {
    if (location)
      switch (pathname[2]) {
        case '0':
          UseAxios.get(`/challenges?scope=stars&order=random`).then((res) => {
            setSavanaData(res.data);
            setIdx(0);
          });
          break;
        case '1':
          UseAxios.get(`/challenges?scope=stars&order=popularity`).then((res) => {
            setSavanaData(res.data);
            let idx = res.data.findIndex((el) => el.id === location.state.id);
            setIdx(idx);
          });
          break;
        case '2':
          UseAxios.get(`/challenges?scope=stars&order=latest`).then((res) => {
            setSavanaData(res.data);
            let idx = res.data.findIndex((el) => el.id === location.state.id);
            setIdx(idx);
          });
          break;
        case '3':
          UseAxios.get(`/challenges?scope=general&order=random`).then((res) => {
            const newArr = res.data;
            let idx = newArr.findIndex((el) => el.id === location.state.id);
            let firstObj = newArr.splice(idx, 1);
            newArr.unshift(firstObj[0]);
            setSavanaData(newArr);
            setIdx(0);
          });
          break;
        case '4':
          UseAxios.get(`/challenges?scope=all&order=latest`, {
            params: { challengeId: location.state.challengeId },
          }).then((res) => {
            setSavanaData(res.data);
            let idx = res.data.findIndex((el) => el.id === location.state.id);
            setIdx(idx);
          });
          break;
        case '5':
          UseAxios.get(`/challenges?scope=all&order=latest&userId=${userData.id}`).then((res) => {
            setSavanaData(res.data);
            let idx = res.data.findIndex((el) => el.id === location.state.id);
            setIdx(idx);
          });
          break;
        case '6':
          UseAxios.get(`/challenges/user/${userData.id}`).then((res) => {
            setSavanaData(res.data);
            let idx = res.data.findIndex((el) => el.id === location.state.id);
            setIdx(idx);
          });
          break;
      }
  }, []);
  return (
    <div id={styles.savana}>
      {savanaData && savanaData.length > 0 ? (
        <ChallengeList styles={styles} data={savanaData} idx={idx}></ChallengeList>
      ) : (
        '기린이 존재하지 않아요 힝힝'
      )}
    </div>
  );
}

export default SavanaPage;
