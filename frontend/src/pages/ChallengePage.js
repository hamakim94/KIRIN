import React, { useEffect, useState } from 'react';
import ChallengeTop from '../components/challenge/ChallengeTop';
import ChallengeStarProfile from '../components/challenge/ChallengeStarProfile';
import styles from './ChallengePage.module.css';
import ShowChallenge from '../components/challenge/ShowChallenge';
import ShowDonationNow from '../components/challenge/ShowDonationNow';
import ShowDonationInfo from '../components/challenge/ShowDonationInfo';

function ChallengePage() {
  const data = [
    {
      id: 0,
      title: '챌린지',
      description: <ShowChallenge styles={styles}></ShowChallenge>,
    },
    {
      id: 1,
      title: '기부현황',
      description: <ShowDonationNow styles={styles}></ShowDonationNow>,
    },
    {
      id: 2,
      title: '기부정보',
      description: <ShowDonationInfo styles={styles}></ShowDonationInfo>,
    },
  ];
  const [index, setIndex] = useState(0);

  return (
    <div>
      <ChallengeTop styles={styles}></ChallengeTop>
      <ChallengeStarProfile styles={styles}> </ChallengeStarProfile>
      <ul className={styles.tabMenu}>
        {data.map((item) => (
          <li
            key={item.id}
            className={index === item.id ? styles.active : null}
            onClick={() => setIndex(item.id)}
          >
            {item.title}
          </li>
        ))}
      </ul>
      {data
        .filter((item) => index === item.id)
        .map((item) => (
          <div>
            <hr></hr>
            {item.description}
          </div>
        ))}
    </div>
  );
}

export default ChallengePage;
