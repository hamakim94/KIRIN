import React from 'react';
import ChallengeCard from '../common/ChallengeCard';
import styles from './ChallengeList.module.css';

function ChallengeList(props) {
  return (
    <div className={`${styles.challengeContainer} ${styles.hScroll}`}>
      <div>
        {props.data
          ? props.data.map((item, index) => <ChallengeCard item={item} index={index} key={index} />)
          : ''}
      </div>
    </div>
  );
}

export default ChallengeList;
