import React, { useEffect, useState } from 'react';
import SelectList from '../components/challenge/select/SelectList';
import styles from './SelectPage.module.css';
import Header from '../components/common/Header';
import UseAxios from '../utils/UseAxios';

function SelectPage() {
  const [challengeData, setChallengeData] = useState(null);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    UseAxios.get(`/challenges/select`).then((res) => {
      setChallengeData(res.data);
      setLoading(true);
    });
  }, []);
  return (
    <div className='wrapper' style={{ height: window.innerHeight - 70, paddingTop: 15 }}>
      {loading ? (
        <div>
          <Header title={'챌린지 선택'}></Header>
          <div>인기 챌린지</div>
          <SelectList styles={styles} data={challengeData}></SelectList>
        </div>
      ) : (
        '로딩로딩'
      )}
    </div>
  );
}

export default SelectPage;
