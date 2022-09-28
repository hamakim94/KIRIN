import React from 'react';
import ChallengeCard from './ChallengeCard';

function DoChallenge(props) {
  const challengeData = [];
  for (let i = 0; i < 10; i++) {
    challengeData.push(<ChallengeCard styles={props.styles} key={i}></ChallengeCard>);
  }
  return (
    <div>
      <div className={`${props.styles.challengeContainer} ${props.styles.hScroll}`}>
        {challengeData}
      </div>
    </div>
  );
}

export default DoChallenge;
