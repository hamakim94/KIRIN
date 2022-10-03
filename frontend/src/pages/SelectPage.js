import React, { useEffect, useState } from 'react';
import SelectList from '../components/challenge/select/SelectList';
import styles from './SelectPage.module.css';
import Header from '../components/common/Header';
import UseAxios from '../utils/UseAxios';

function SelectPage() {
  const [challengeData, setChallengeData] = useState(null);
  const [challengeName, setChallengeName] = useState('');
  const [filteredChallengeData, setFilteredChallengeData] = useState([]);
  const [loading, setLoading] = useState(null);
  useEffect(() => {
    UseAxios.get(`/challenges/select`).then((res) => {
      setFilteredChallengeData(res.data);
      setChallengeData(res.data);
      setLoading(true);
      console.log(res.data);
    });
  }, []);

  const searchFilter = (text) => {
    if (text) {
      const newData = challengeData.filter((challenge) => {
        const challengeData = challenge.title ? challenge.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return challengeData.indexOf(textData) > -1;
      });
      setFilteredChallengeData(newData);
      setChallengeName(text);
    } else {
      setFilteredChallengeData(challengeData);
      setChallengeName(text);
    }
  };
  return (
    <div className='wrapper' style={{ height: window.innerHeight - 70, paddingTop: 15 }}>
      {loading ? (
        <div>
          <Header title={'챌린지 선택'}></Header>
          <div className={styles.topContainer}>
            <input
              className={styles.searchBox}
              value={challengeName}
              onChange={(e) => searchFilter(e.target.value)}
              type={'text'}
              placeholder={'검색'}
            ></input>
          </div>
          <div style={{ marginTop: 15 }}>
            <SelectList styles={styles} data={filteredChallengeData}></SelectList>
          </div>
        </div>
      ) : (
        '로딩로딩'
      )}
    </div>
  );
}

export default SelectPage;
