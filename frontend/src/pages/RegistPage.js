import React, { useMemo, useContext, useRef, useState, useEffect } from 'react';
import Context from '../utils/Context';
import Header from '../components/common/Header';
import styles from './RegistPage.module.css';
import dummy from '../assets/sound/dummy.mp3';
function RegistPage() {
  const videoRef = useRef(null);
  const checkRef = useRef(null);
  const audioRef = useRef(null);
  const [number, setNumber] = useState(1);
  const [waitButton, setWaitButton] = useState(false);
  const [tip, setTip] = useState('비디오를 누를 시 영상이 재생됩니다.');
  const { blob } = useContext(Context);
  const handleClick = () => {
    if (videoRef.current) {
      if (checkRef.current) {
        videoRef.current.pause();
        checkRef.current = false;
        setTip('비디오를 누를 시 영상이 재생됩니다.');
        audioRef.current.pause();
        setWaitButton(false);
      } else {
        videoRef.current.play();
        audioRef.current.play();
        checkRef.current = true;
        setTip('비디오를 누를 시 영상이 일시정지됩니다.');
        setWaitButton(true);
      }
    }
  };

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => {
          clearInterval(id);
          setWaitButton(false);
        };
      }
    }, [delay]);
  };

  useInterval(
    () => {
      if (waitButton) {
        setNumber(number + 0.1);
      }
    },
    number > 15 ? null : 100
  );

  const videoItem = React.memo(function videoItem() {
    return (
      <video
        ref={videoRef}
        src={URL.createObjectURL(blob)}
        style={{ width: '100%', height: '100%' }}
        onClick={handleClick}
      ></video>
    );
  });
  const MemoizedItem = useMemo(() => videoItem, [blob]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    console.log(videoRef.current.duration);
    return () => {};
  }, [videoRef]);
  return (
    <div className='wrapper'>
      <Header title={'챌린지 등록'}></Header>
      {blob ? (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <MemoizedItem></MemoizedItem>
          <audio ref={audioRef} src={dummy}></audio>
          <span style={{ textAlign: 'center', fontSize: 12 }}>{tip}</span>
          {number.toFixed(1)}
        </div>
      ) : (
        ''
      )}
      <div>참여 챌린지 제목</div>
      <div>
        <input className={styles.inputBox} type='text' disabled value={'머리아프다'}></input>
      </div>
      <form>
        <div>기부 금액(선택)</div>
        <div>기부 금액(선택)</div>
      </form>
    </div>
  );
}

export default RegistPage;
