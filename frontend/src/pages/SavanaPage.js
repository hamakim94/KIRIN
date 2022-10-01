import React, { useEffect, useState } from 'react';
import UseAxios from '../utils/UseAxios';
import styles from './SavanaPage.module.css';
import ChallengeList from '../components/savana/ChallengeList';

function SavanaPage() {
  //랜덤으로 바꾸기
  const [currentHeight, setCurrentHeight] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [popularityData, setPopularityData] = useState(null);
  const [heightArr, setHeightArr] = useState([]);
  const [idx, setIdx] = useState(0);
  const windowHeight = window.innerHeight - 56;
  // 0부터 시작해서 더해지는 배열을 만들자
  const touchEnd = (e) => {
    const distanceY = touchPosition.y - e.changedTouches[0].pageY;
    if (distanceY > 0 && idx < heightArr.length - 1) {
      window.scrollTo(0, heightArr[idx + 1]);
      setIdx(idx + 1);
    } else if (distanceY < 0 && idx > 0) {
      window.scrollTo(0, heightArr[idx - 1]);
      setIdx(idx - 1);
    }
  };
  useEffect(() => {
    UseAxios.get(`/challenges?scope=all&order=latest&challengeId=2`).then((res) => {
      console.log(res.data);
      setPopularityData(res.data);
      for (let i = 0; i < res.data.length; i++) {
        setHeightArr([...heightArr, i * windowHeight]);
      }
    });
  }, []);
  return (
    <div
      id='savana'
      onTouchStart={(e) =>
        setTouchPosition({
          x: e.changedTouches[0].pageX,
          y: e.changedTouches[0].pageY,
        })
      }
      onTouchEnd={touchEnd}
    >
      <ChallengeList styles={styles} data={popularityData}></ChallengeList>
    </div>
  );
}

export default SavanaPage;
