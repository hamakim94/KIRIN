import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './PlusPage.module.css';
import RecordRTC from 'recordrtc';
import { useNavigate, useLocation } from 'react-router-dom';
import Context from '../utils/Context';
import { MdOutlineFlipCameraAndroid, MdOutlineQueueMusic } from 'react-icons/md';
import UseAxios from '../utils/UseAxios';

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
  const [challengeData, setChallengeData] = useState(null);
  const [length, setLength] = useState(null);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  let mediaStream;

  const handleRecording = async () => {
    // 시작하려고 했을 떄 이미 진행 다했으면 시간초 늘려놓기
    if (number === 0) {
      setNumber((prev) => (prev = length));
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          frameRate: 30,
          facingMode: changeCam,
        },
        audio: false,
      });
      // 기존에 있던 영상파일 날리고 시작
      if (blob) {
        setBlob(null);
      }

      // 새녹화
      setStream(mediaStream);
      recorderRef.current = new RecordRTC(mediaStream, {
        type: 'video',
        mimeType: 'video/webm;codecs=vp9',
      });
      recorderRef.current.startRecording();

      // 노래 새로 시작
      audioRef.current.currentTime = 0;
      audioRef.current.volume = 0.2;
      audioRef.current.play();

      setToggleBtn(true);
      // 타이머 시작
      setWaitButton(true);
    } else {
      mediaStream = await navigator.mediaDevices.getUserMedia({
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
      audioRef.current.currentTime = 0;
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
    audioRef.current.currentTime = 0;
    setWaitButton(false);
    setNumber(length);
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    navigate('/regist', {
      state: {
        id: challengeData.challengeId,
        title: challengeData.title,
        length: challengeData.length,
        music: challengeData.music,
      },
    });
  };

  const handleRetry = () => {
    recorderRef.current.stopRecording(() => {
      setBlob(null);
    });
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setWaitButton(false);
    setNumber(length);
    setPause(false);
    if (stream) {
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    const retry = async () => {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          frameRate: 30,
          facingMode: changeCam,
        },
        audio: false,
      });
      setStream(mediaStream);
      refVideo.current.srcObject = mediaStream;
    };
    retry();
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
    return () => {
      if (stream) {
        stream.getTracks().forEach(function (track) {
          track.stop();
        });
      }
    };
  }, [stream, refVideo]);

  useEffect(() => {
    const start = async () => {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          frameRate: 30,
          facingMode: 'user',
        },
        audio: false,
      });
      setStream(mediaStream);
    };
    start();

    UseAxios.get(`/challenges/select/${location.state.id}`).then((res) => {
      setChallengeData(res.data);
      setNumber(res.data.length);
      setLength(res.data.length);
      audioRef.current = new Audio(res.data.music);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
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
            audioRef.current.currentTime = 0;
            setToggleBtn(false);
            setPause(false);
            setNumber(0);
          } else {
            if (length) setNumber(length);
          }
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
              percent={length ? (length - number) / length : 0}
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
              <span style={{ marginLeft: 10 }} onClick={() => navigate(-1)}>
                X
              </span>
            </div>
            <div
              style={{
                display: 'flex',
                flex: 8,
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
                color: '#FFFFFF',
              }}
            >
              <div
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                onClick={() => navigate('/select')}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 25,
                  }}
                >
                  <div>
                    <MdOutlineQueueMusic style={{ marginRight: 2 }} size={30}></MdOutlineQueueMusic>
                  </div>
                  <div>
                    <div>{challengeData ? challengeData.title : '챌린지선택'}</div>
                    <div style={{ fontSize: '0.75em' }}>
                      {challengeData ? challengeData.star + '-' + challengeData.musicTitle : ''}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flex: 1,
                justifyContent: 'flex-end',
              }}
            >
              {pause || waitButton ? (
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
                {blob || number < length ? <span onClick={handleRetry}>다시찍기</span> : ''}
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
                {/* 영상이 있거나 시간 초를 썼다면 보내기 */}
                {blob || number < length ? <span onClick={handleStop}>보내기</span> : ''}
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
