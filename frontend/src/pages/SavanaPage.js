import React, { useEffect, useState } from 'react';
import UseAxios from '../utils/UseAxios';
import styles from './SavanaPage.module.css';
import ChallengeList from '../components/savana/ChallengeList';

function SavanaPage() {
  //랜덤으로 바꾸기
  const [savanaData, setSavanaData] = useState(null);

  useEffect(() => {
    UseAxios.get(`/challenges?scope=stars&order=random`).then((res) => {
      setSavanaData(res.data);
    });
  }, []);
  return (
    <div id={styles.savana}>
      <ChallengeList styles={styles} data={savanaData}></ChallengeList>
    </div>
  );
}

export default SavanaPage;
