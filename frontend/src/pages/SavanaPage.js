import React, { useEffect, useState } from 'react';
import UseAxios from '../utils/UseAxios';
import styles from './SavanaPage.module.css';
import ChallengeList from '../components/savana/ChallengeList';

function SavanaPage() {
  //랜덤으로 바꾸기
  const [popularityData, setPopularityData] = useState(null);
  useEffect(() => {
    UseAxios.get('/challenges?scope=stars&order=popularity').then((res) => {
      setPopularityData(res.data);
    });
  }, []);
  return (
    <div>
      <ChallengeList styles={styles} data={popularityData}></ChallengeList>
    </div>
  );
}

export default SavanaPage;
