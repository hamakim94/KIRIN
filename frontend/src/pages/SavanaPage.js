import React, { useEffect, useState } from 'react';
import UseAxios from '../utils/UseAxios';
import styles from './SavanaPage.module.css';
import ChallengeList from '../components/savana/ChallengeList';

function SavanaPage() {
  //랜덤으로 바꾸기
  const [popularityData, setPopularityData] = useState(null);
  const [heightArr, setHeightArr] = useState([]);
  const windowHeight = window.innerHeight - 56;
  useEffect(() => {
    UseAxios.get(`/challenges?scope=stars&order=random`).then((res) => {
      setPopularityData(res.data);
      const tempArr = [];
      for (let i = 0; i < res.data.length; i++) {
        tempArr.push(i * windowHeight);
      }
      setHeightArr(tempArr);
    });
  }, []);
  return (
    <div id={styles.savana}>
      <ChallengeList styles={styles} data={popularityData}></ChallengeList>
    </div>
  );
}

export default SavanaPage;
