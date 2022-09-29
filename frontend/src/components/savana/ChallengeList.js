import React, { useContext } from 'react';
import ChallengeCard from './ChallengeCard';

function ChallengeList(props) {
  return (
    <div className={`${props.styles.challengeContainer} ${props.styles.hScroll}`}>
      <div>
        {props.data
          ? props.data.map((item, index) => (
              <ChallengeCard styles={props.styles} item={item} index={index} key={index} />
            ))
          : ''}
      </div>
    </div>
  );
}

export default ChallengeList;
