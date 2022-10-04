import React, { useContext, useEffect, useRef, useState } from 'react';
import Context from '../../utils/Context';
import ChallengeCard from './ChallengeCard';

function ChallengeList(props) {
  const idxRef = useRef([]);
  const prevRef = useRef(null);
  const conRef = useRef(null);
  const [touchPosition, setTouchPosition] = useState(null);
  const [distanceY, setdistanceY] = useState(null);
  const [loading, setLoading] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { setSelected } = useContext(Context);
  const height = window.innerHeight - 56;
  useEffect(() => {
    if (idxRef.current[props.idx] && loading) {
      conRef.current.scrollTo(0, props.idx * height);
      idxRef.current[props.idx].play();
      idxRef.current[props.idx].muted = false;
      idxRef.current[props.idx].volume = 0.1;
      setSelected(props.data[props.idx].challengeId);
      prevRef.current = props.idx;
    }
  }, [loading]);

  const check = (e) => {
    const scrollHeight = e.target.scrollTop;
    const idx = scrollHeight / height;
    if (Number.isInteger(scrollHeight / height)) {
      setSelected(props.data[idx].challengeId);
      if (distanceY > 0 && idx > 0) {
        if (idx === props.data.length - 1 && idx === prevRef.current) {
          idxRef.current[idx].play();
          idxRef.current[idx].muted = false;
          idxRef.current[idx].volume = 0.1;
        } else {
          idxRef.current[idx].play();
          idxRef.current[idx].muted = false;
          idxRef.current[idx].volume = 0.1;
          idxRef.current[prevRef.current].currentTime = 0;
          idxRef.current[prevRef.current].pause();
          prevRef.current = idx;
        }
      } else if (distanceY < 0) {
        idxRef.current[idx].play();
        idxRef.current[idx].muted = false;
        idxRef.current[idx].volume = 0.1;
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
      ref={conRef}
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
