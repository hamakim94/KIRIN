import React, { useState } from 'react';
import styles from './MyChallenge.module.css';
import LikeChallenge from './LikeChallenge';
import DoChallenge from './DoChallenge';

function ChallengeList(props) {
  const data = [
    {
      id: 0,
      title: '참여',
      description: <LikeChallenge styles={styles}></LikeChallenge>,
    },
    {
      id: 1,
      title: '좋아요',
      description: <DoChallenge styles={styles}></DoChallenge>,
    },
  ];
  const [index, setIndex] = useState(0);

  return (
    <div>
      <ul className={styles.tabMenu}>
        {data.map((item) => (
          <li
            key={item.id}
            className={index === item.id ? styles.active : null}
            onClick={() => setIndex(item.id)}
          >
            {item.title} &nbsp;
          </li>
        ))}
      </ul>
      {data
        .filter((item) => index === item.id)
        .map((item) => (
          <div>{item.description}</div>
        ))}
    </div>
  );
}

export default ChallengeList;
