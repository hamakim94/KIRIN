import React, { useMemo, useContext, useRef, useState, useEffect } from 'react';
import Context from '../utils/Context';
import Header from '../components/common/Header';
import styles from './RegistPage.module.css';
import getBlobDuration from 'get-blob-duration';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material/';
function RegistPage() {
  const videoRef = useRef(null);
  const checkRef = useRef(null);
  const audioRef = useRef(null);
  const [number, setNumber] = useState(0.0);
  const [waitButton, setWaitButton] = useState(false);
  const [length, setLength] = useState(null);
  const [tip, setTip] = useState('비디오를 누를 시 영상이 재생됩니다.');
  const [title, setTitle] = useState(null);
  const [amount, setAmount] = useState(null);
  const { blob } = useContext(Context);
  const location = useLocation();
  getBlobDuration(blob).then(function (duration) {
    setLength(duration);
  });
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
          setTip('비디오를 누를 시 영상이 재생됩니다.');
          if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setNumber(0.0);
          }
          if (checkRef.current) {
            checkRef.current = false;
          }
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
    number > length ? null : 100
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
  const buttonItem = React.memo(function buttonItem() {
    return (
      <Button
        type='button'
        fullWidth
        variant='contained'
        size='medium'
        className={styles.Btn}
        style={{ height: 30, backgroundColor: title ? '#ffd046' : '#d2d2d2', transition: 1 }}
      >
        업로드
      </Button>
    );
  });
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
  }, [videoRef]);
  return (
    <div className='wrapper'>
      <Header title={'챌린지 등록'}></Header>
      {blob ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginBottom: 25,
          }}
        >
          <MemoizedItem></MemoizedItem>
          <audio ref={audioRef} src={location ? `${location.state.music}` : ''}></audio>
          <span style={{ textAlign: 'center', fontSize: 12 }}>{tip}</span>
        </div>
      ) : (
        ''
      )}
      <div>참여 챌린지 제목</div>
      <div>
        <input
          className={styles.inputBox}
          type='text'
          disabled
          value={location ? `${location.state.title}` : ''}
        ></input>
      </div>
      <form>
        <div>나의 챌린지 제목</div>
        <input
          className={styles.inputBox}
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <div>기부 금액(선택)</div>
        <div>
          <Button
            type='button'
            fullWidth
            variant='contained'
            size='medium'
            className={styles.Btn}
            style={{ height: 30, backgroundColor: title ? '#ffd046' : '#d2d2d2', transition: 1 }}
          >
            충전
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RegistPage;
