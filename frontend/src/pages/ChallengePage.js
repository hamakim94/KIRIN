import React, { useState, useContext } from 'react';
import Header from '../components/common/Header';
import ChallengeStarProfile from '../components/challenge/ChallengeStarProfile';
import styles from './ChallengePage.module.css';
import ShowChallenge from '../components/challenge/ShowChallenge';
import ShowDonationNow from '../components/challenge/ShowDonationNow';
import ShowDonationInfo from '../components/challenge/ShowDonationInfo';
import { useLocation } from 'react-router-dom';
import Context from '../utils/Context';
function ChallengePage() {
  const { selected, setSelected } = useContext(Context);
  const location = useLocation();
  const pathname = location.pathname.split('/');
  if (location.state.data.isProceeding) setSelected(pathname[2]);
  else setSelected(0);
  const data = [
    {
      id: 0,
      title: '챌린지',
      description: <ShowChallenge styles={styles} data={location.state.data}></ShowChallenge>,
    },
    {
      id: 1,
      title: '기린천사',
      description: <ShowDonationNow styles={styles} data={location.state.data}></ShowDonationNow>,
    },
    {
      id: 2,
      title: '기부현황',
      description: <ShowDonationInfo styles={styles} data={location.state.data}></ShowDonationInfo>,
    },
  ];
  const [index, setIndex] = useState(0);

  return (
    <div>
      <Header title={location.state.data.title}></Header>
      <ChallengeStarProfile data={location.state.data} styles={styles}></ChallengeStarProfile>
      <ul className={styles.tabMenu}>
        {data.map((item) => (
          <li
            key={item.id}
            className={index === item.id ? styles.active : null}
            style={{
              color: index === item.id ? '#000000' : '#808080',
              fontWeight: index === item.id ? 'bold' : 'lighter',
            }}
            onClick={() => setIndex(item.id)}
          >
            {item.title}
          </li>
        ))}
      </ul>
      {data
        .filter((item) => index === item.id)
        .map((item) => (
          <>
            <hr></hr>
            {item.description}
          </>
        ))}
    </div>
  );
}

export default ChallengePage;
