import React, { useEffect, useState } from 'react';
import UseAxios from '../utils/UseAxios';
import styles from './SavanaPage.module.css';
import ChallengeList from '../components/savana/ChallengeList';
import { useLocation } from 'react-router-dom';

function SavanaPage() {
  //랜덤으로 바꾸기
  const [savanaData, setSavanaData] = useState(null);
  const location = useLocation();
  const pathname = location.pathname.split('/');
  useEffect(() => {
    if (location)
      switch (pathname[2]) {
        case '0':
          UseAxios.get(`/challenges?scope=stars&order=random`).then((res) => {
            setSavanaData(res.data);
            console.log(res.data);
          });
          break;
        case '1':
          UseAxios.get(`/challenges?scope=stars&order=popularity`).then((res) => {
            const newArr = res.data;
            let idx = newArr.findIndex((el) => el.id === location.state.id);
            let firstObj = newArr.splice(idx, 1);
            newArr.unshift(firstObj[0]);
            setSavanaData(newArr);
          });
          break;
        case '2':
          UseAxios.get(`/challenges?scope=stars&order=latest`).then((res) => {
            const newArr = res.data;
            let idx = newArr.findIndex((el) => el.id === location.state.id);
            let firstObj = newArr.splice(idx, 1);
            newArr.unshift(firstObj[0]);
            setSavanaData(newArr);
          });
          break;
        case '3':
          UseAxios.get(`/challenges?scope=general&order=random`).then((res) => {
            const newArr = res.data;
            let idx = newArr.findIndex((el) => el.id === location.state.id);
            let firstObj = newArr.splice(idx, 1);
            newArr.unshift(firstObj[0]);
            setSavanaData(newArr);
            console.log(newArr);
          });
          break;
        case '4':
          UseAxios.get(`/challenges?scope=all&order=latest`, {
            params: { challengeId: location.state.challengeId },
          }).then((res) => {
            const newArr = res.data;
            let idx = newArr.findIndex((el) => el.id === location.state.id);
            let firstObj = newArr.splice(idx, 1);
            newArr.unshift(firstObj[0]);
            setSavanaData(newArr);
          });
          break;
        case '5':
          UseAxios.get(`/challenges?scope=all&order=latest`, {
            params: { challengeId: location.state.challengeId },
          }).then((res) => {
            const newArr = res.data;
            let idx = newArr.findIndex((el) => el.id === location.state.id);
            let firstObj = newArr.splice(idx, 1);
            newArr.unshift(firstObj[0]);
            setSavanaData(newArr);
          });
          break;
      }
  }, []);
  return (
    <div id={styles.savana}>
      <ChallengeList styles={styles} data={savanaData}></ChallengeList>
    </div>
  );
}

export default SavanaPage;
