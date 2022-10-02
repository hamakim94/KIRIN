import React, { useEffect, useRef } from 'react';
import ChallengeCard from './ChallengeCard';

function ChallengeList(props) {
  const idxRef = useRef([]);

  useEffect(() => {
    // if (idxRef.current[0]) {
    //   idxRef.current[0].volume = 0.1;
    //   idxRef.current[0].play();
    //   console.log(123);
    // }
    console.log(123);
  }, [idxRef.current[0]]);
  const check = (e) => {
    const height = window.innerHeight - 56;
    const scrollHeight = e.target.scrollTop;
    console.log(scrollHeight / height);
    // if (scrollHeight / height === 1) {
    // }
    console.log(Number.isInteger(scrollHeight / height));
  };
  console.log(window.innerHeight - 56);

  return (
    <div className={props.styles.challengeContainer} onScroll={check}>
      {props.data
        ? props.data.map((item, index) => (
            <ChallengeCard
              check={idxRef}
              styles={props.styles}
              item={item}
              index={index}
              key={index}
            />
          ))
        : ''}
    </div>
  );
}

export default ChallengeList;
