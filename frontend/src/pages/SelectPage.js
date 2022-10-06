import React, { useEffect, useState } from 'react';
import SelectList from '../components/challenge/select/SelectList';
import styles from './SelectPage.module.css';
import Sheet from 'react-modal-sheet';
import UseAxios from '../utils/UseAxios';

function SelectPage(props) {
  const [challengeData, setChallengeData] = useState(null);
  const [challengeName, setChallengeName] = useState('');
  const [filteredChallengeData, setFilteredChallengeData] = useState([]);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    UseAxios.get(`/challenges/select`).then((res) => {
      setFilteredChallengeData(res.data);
      setChallengeData(res.data);
      setLoading(true);
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
    <>
      {loading ? (
        <div>
          <Sheet isOpen={props.isOpen} onClose={() => props.setIsOpen(false)}>
            <Sheet.Container style={{ height: '90%', zIndex: 4, position: 'absolute' }}>
              <Sheet.Header />
              <div className={styles.topContainer}>
                <input
                  className={styles.searchBox}
                  value={challengeName}
                  onChange={(e) => searchFilter(e.target.value)}
                  type={'text'}
                  placeholder={'검색'}
                ></input>
              </div>
              <Sheet.Content disableDrag={true}>
                <div>
                  <SelectList
                    styles={styles}
                    data={filteredChallengeData}
                    setIsOpen={props.setIsOpen}
                  ></SelectList>
                </div>
              </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop style={{ zIndex: 3 }} onTap={() => props.setIsOpen(false)} />
          </Sheet>
        </div>
      ) : (
        '로딩로딩'
      )}
    </>
  );
}

export default SelectPage;
