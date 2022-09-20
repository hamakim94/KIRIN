import React from 'react';
import ChallengeCard from './ChallengeCard';

function ChallengeList(props) {
  const challengeData = [];
  for (let i = 0; i < 10; i++) {
    challengeData.push(<ChallengeCard styles={props.styles} key={i}></ChallengeCard>);
  }
  return (
    <div>
      <div className={props.styles.myTitle}>나의 챌린지</div>
      <div className={`${props.styles.challengeContainer} ${props.styles.hScroll}`}>
        {challengeData}
      </div>
    </div>
  );
}

export default ChallengeList;
