import React, { useContext, useEffect, useRef, useState } from 'react';
import Context from '../../utils/Context';
import ChallengeCard from './ChallengeCard';

function ChallengeList(props) {
  const idxRef = useRef([]);
  const prevRef = useRef(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [distanceY, setdistanceY] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { setSelected } = useContext(Context);
  useEffect(() => {
    if (idxRef.current[0] && loading) {
      idxRef.current[0].volume = 0.1;
      idxRef.current[0].play();
      setSelected(props.data[0].challengeId);
    }
  }, [loading]);

  const check = (e) => {
    const height = window.innerHeight - 56;
    const scrollHeight = e.target.scrollTop;
    const idx = scrollHeight / height;
    if (Number.isInteger(scrollHeight / height)) {
      setSelected(props.data[idx].challengeId);
      if (distanceY > 0 && idx > 0) {
        if (idx === props.data.length - 1 && idx === prevRef.current) {
          idxRef.current[idx].volume = 0.1;
          idxRef.current[idx].play();
        } else {
          idxRef.current[idx].volume = 0.1;
          idxRef.current[idx].play();
          idxRef.current[prevRef.current].currentTime = 0;
          idxRef.current[prevRef.current].pause();
          prevRef.current = idx;
        }
      } else if (distanceY < 0) {
        console.log(idx);
        console.log(prevRef.current);
        idxRef.current[idx].volume = 0.1;
        idxRef.current[idx].play();
        idxRef.current[prevRef.current].currentTime = 0;
        idxRef.current[prevRef.current].pause();
        prevRef.current = idx;
      }
    }
  };

  const touchEnd = (e) => {
    setdistanceY(touchPosition.y - e.changedTouches[0].pageY);
  };

  return (
    <div
      className={props.styles.challengeContainer}
      onTouchStart={(e) =>
        setTouchPosition({
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY,
        })
      }
      onTouchEnd={touchEnd}
      onScroll={check}
    >
      {props.data
        ? props.data.map((item, index) => (
            <ChallengeCard
              check={idxRef}
              styles={props.styles}
              item={item}
              index={index}
              key={index}
              setLoading={index === 0 ? setLoading : false}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          ))
        : ''}
    </div>
  );
}

export default ChallengeList;
