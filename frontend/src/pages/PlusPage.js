import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './PlusPage.module.css';
import RecordRTC, { invokeSaveAsDialog } from 'recordrtc';
import dummy from '../assets/sound/dummy.mp3';
import { useNavigate } from 'react-router-dom';
import Context from '../utils/Context';
import { MdOutlineFlipCameraAndroid, MdOutlineQueueMusic } from 'react-icons/md';

function ProgressBar(props) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const newValue = props.width * props.percent;
    setValue(newValue);
  }, [props.width, props.percent]);
  return (
    <div className={props.styles.progressDiv} style={{ width: props.width }}>
      <div style={{ width: `${value}px` }} className={props.styles.progress} />
    </div>
  );
}

function PlusPage() {
  const [stream, setStream] = useState(null);
  const { blob, setBlob } = useContext(Context);
  const [toggleBtn, setToggleBtn] = useState(false);
  const [pause, setPause] = useState(false);
  const [number, setNumber] = useState(null);
  const [waitButton, setWaitButton] = useState(false);
  const [changeCam, setChangeCam] = useState('user');
  const refVideo = useRef(null);
  const recorderRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const handleRecording = async () => {
    if (number === 0) {
      setNumber((prev) => (prev = 15));
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          frameRate: 30,
          facingMode: changeCam,
        },
        audio: false,
      });

      if (blob) {
        setBlob(null);
      }
      setStream(mediaStream);
      recorderRef.current = new RecordRTC(mediaStream, {
        type: 'video',
        mimeType: 'video/webm;codecs=vp9',
      });
      recorderRef.current.startRecording();
      audioRef.current.currentTime = 50;
      audioRef.current.volume = 0.2;
      audioRef.current.play();
      setToggleBtn(true);
      setWaitButton(true);
    } else {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          frameRate: 30,
          facingMode: changeCam,
        },
        audio: false,
      });

      if (blob) {
        setBlob(null);
      }
      setStream(mediaStream);
      recorderRef.current = new RecordRTC(mediaStream, {
        type: 'video',
        mimeType: 'video/webm;codecs=vp9',
      });
      recorderRef.current.startRecording();
      audioRef.current.currentTime = 50;
      audioRef.current.volume = 0.2;
      audioRef.current.play();
      setToggleBtn(true);
      setWaitButton(true);
    }
  };

  const handlePause = () => {
    recorderRef.current.pauseRecording();
    setToggleBtn(false);
    setPause(true);
    audioRef.current.pause();
    setWaitButton(false);
  };

  const handleResume = () => {
    recorderRef.current.resumeRecording();
    setToggleBtn(true);
    audioRef.current.play();
    setWaitButton(true);
  };

  const handleStop = () => {
    recorderRef.current.stopRecording(() => {
      setBlob(recorderRef.current.getBlob());
    });
    audioRef.current.pause();
    audioRef.current.currentTime = 55;
    setWaitButton(false);
    setNumber(15);
    navigate('/preview');
  };

  const handleSave = () => {
    invokeSaveAsDialog(blob);
  };

  const handleDirection = () => {
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    if (changeCam === 'user') {
      console.log('유저유저');
      setChangeCam({ exact: 'environment' });
      let mediaStream;
      const start = async () => {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            frameRate: 30,
            facingMode: { exact: 'environment' },
          },
          audio: false,
        });
        setStream(mediaStream);
        refVideo.current.srcObject = mediaStream;
        console.log('망했다');
      };
      start();
    } else {
      console.log('후면후면');
      setChangeCam('user');
      let mediaStream;
      const start = async () => {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            frameRate: 30,
            facingMode: 'user',
          },
          audio: false,
        });
        setStream(mediaStream);
        refVideo.current.srcObject = mediaStream;
      };
      start();
    }
  };

  useEffect(() => {
    if (!refVideo.current) {
      return;
    }
    refVideo.current.srcObject = stream;
  }, [stream, refVideo]);

  useEffect(() => {
    let mediaStream;

    const start = async () => {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          frameRate: 30,
          facingMode: 'user',
        },
        audio: false,
      });
      setStream(mediaStream);
      audioRef.current = new Audio(dummy);
    };
    start();
    setNumber(15);
    return () => {
      if (stream) {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 55;
      }
    };
  }, []);

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
          setWaitButton(false);
          clearInterval(id);
          if (recorderRef.current && audioRef) {
            recorderRef.current.stopRecording(() => {
              setBlob(recorderRef.current.getBlob());
            });
            audioRef.current.pause();
            audioRef.current.currentTime = 55;
            setToggleBtn(false);
            setPause(false);
            setNumber(0);
          } else setNumber(15);
        };
      }
    }, [delay]);
  };

  useInterval(
    () => {
      if (waitButton) {
        setNumber((number - 0.1).toFixed(1));
      }
    },
    number < 0 ? null : 100
  );
  return (
    <div className={styles.wrapper}>
      <div className={styles.coverBox}>
        <div style={{ flex: 1, flexDirection: 'row' }}>
          <div style={{ flex: 1 }}>
            <ProgressBar
              styles={styles}
              width={window.innerWidth}
              percent={(15 - number) / 15}
            ></ProgressBar>
          </div>
          <div
            style={{
              display: 'flex',
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 5,
            }}
          >
            <div style={{ flex: 1, color: '#FFFFFF' }}>
              <span style={{ marginLeft: 10 }} onClick={() => navigate('/')}>
                X
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#FFFFFF',
              }}
            >
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <MdOutlineQueueMusic style={{ marginRight: 2 }} size={25}></MdOutlineQueueMusic>
                <span>챌린지 선택</span>
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
              {pause ? (
                ''
              ) : (
                <MdOutlineFlipCameraAndroid
                  style={{
                    marginRight: 15,
                    border: 0,
                    outline: 0,
                  }}
                  color={'#FFFFFF'}
                  size={23}
                  onClick={handleDirection}
                >
                  전환
                </MdOutlineFlipCameraAndroid>
              )}
            </div>
          </div>
        </div>
        <div style={{ flex: 9, flexDirection: 'row', alignItems: 'center' }}></div>
        {toggleBtn ? (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 2,
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    justifyContent: 'center',
                    color: 'white',
                    height: 30,
                  }}
                >
                  {number}
                </div>
                <div style={{ display: 'flex', flex: 1 }}>
                  <button className={styles.pauseBtn} onClick={handlePause}></button>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flex: 1,
              }}
            ></div>
          </>
        ) : (
          <>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flex: 2,
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'white',
                  paddingTop: 20,
                }}
              >
                다시찍기
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    justifyContent: 'center',
                    color: 'white',
                    height: 30,
                  }}
                >
                  {number}
                </div>
                <div style={{ display: 'flex', flex: 1 }}>
                  <button
                    className={styles.recordBtn}
                    onClick={pause ? handleResume : handleRecording}
                  ></button>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: 20,
                  color: 'white',
                }}
              >
                {blob || number < 15 ? <span onClick={handleStop}>보내기</span> : ''}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flex: 1,
              }}
            ></div>
          </>
        )}
      </div>
      <video autoPlay ref={refVideo} style={{ width: '100%', height: '100%' }} />
    </div>
  );
}

export default PlusPage;
