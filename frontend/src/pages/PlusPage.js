import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './PlusPage.module.css';
import RecordRTC from 'recordrtc';
import { useNavigate, useLocation } from 'react-router-dom';
import Context from '../utils/Context';
import { MdOutlineFlipCameraAndroid, MdOutlineQueueMusic } from 'react-icons/md';
import { BsX, BsArrowCounterclockwise, BsCheck2 } from 'react-icons/bs';
import UseAxios from '../utils/UseAxios';
// import { toast } from 'react-toastify';
import swal2 from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import SelectPage from './SelectPage';

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
  const [isOpen, setIsOpen] = useState(false);
  const refVideo = useRef(null);
  const recorderRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  let mediaStream;

  // 파일저장
  // const handleSave = () => {
  //   invokeSaveAsDialog(blob);
  // };

  const handleRecording = async () => {
    // 시작하려고 했을 떄 이미 진행 다했으면 시간초 늘려놓기
    if (number === 0) {
      if (challengeData) {
        setNumber((prev) => (prev = length));
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 361 },
            aspectRatio: 16 / 9,
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
          mimeType: 'video/webm;codecs=vp8',
        });
        recorderRef.current.startRecording();

        // 노래 새로 시작
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.1;
        audioRef.current.play();

        setToggleBtn(true);
        // 타이머 시작
        setWaitButton(true);
      } else {
        swal2.fire({
          title: '상단탭에서 챌린지를 선택해주세요.',
          confirmButtonColor: '#ffc947',
          confirmButtonText: '확인',
        });
      }
    } else {
      if (challengeData) {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 361 },
            aspectRatio: 16 / 9,
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
          mimeType: 'video/webm;codecs=vp8',
        });
        recorderRef.current.startRecording();
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.1;
        audioRef.current.play();
        setToggleBtn(true);
        setWaitButton(true);
      } else {
        // const notify = () =>
        //   toast.warning('챌린지를 골라주세요', {
        //     position: 'bottom-center',
        //     autoClose: 5000,
        //     hideProgressBar: true,
        //     closeOnClick: false,
        //     pauseOnHover: false,
        //     draggable: true,
        //     progress: undefined,
        //   });
        // notify();
        swal2.fire({
          title: '상단탭에서 챌린지를 선택해주세요.',
          confirmButtonColor: '#ffc947',
          confirmButtonText: '확인',
        });
      }
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
    navigate('/register', {
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
          width: { min: 361 },
          aspectRatio: 16 / 9,
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
      setChangeCam({ exact: 'environment' });
      const start = async () => {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 361 },
            aspectRatio: 16 / 9,
            facingMode: { exact: 'environment' },
          },
          audio: false,
        });
        setStream(mediaStream);
        refVideo.current.srcObject = mediaStream;
      };
      start();
    } else {
      setChangeCam('user');
      const start = async () => {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { min: 361 },
            aspectRatio: 16 / 9,
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

  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = ''; // chrome에서는 설정이 필요해서 넣은 코드
  };
  useEffect(() => {
    const start = async () => {
      mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { min: 361 },
          aspectRatio: 16 / 9,
          //   frameRate: 30,
          facingMode: 'user',
        },
        audio: false,
      });
      setStream(mediaStream);
    };
    start();
    (() => {
      window.addEventListener('beforeunload', preventClose);
    })();
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  useEffect(() => {
    if (location) {
      const pathname = location.pathname.split('/');
      if (pathname[2] !== 0) {
        UseAxios.get(`/challenges/select/${pathname[2]}`).then((res) => {
          setChallengeData(res.data);
          setNumber(res.data.length);
          setLength(res.data.length);
          audioRef.current = new Audio(`/files/${res.data.music}`);
        });
      }
    }
  }, [location]);

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
          if (recorderRef.current && audioRef.current) {
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
              <span style={{ marginLeft: 10 }} onClick={() => navigate('/')}>
                <BsX size={30}></BsX>
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
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingRight: 25,
                  }}
                >
                  <div style={{ paddingTop: 5 }}>
                    <MdOutlineQueueMusic style={{ marginRight: 2 }} size={30}></MdOutlineQueueMusic>
                  </div>
                  <div>
                    <div className={styles.topBox} onClick={() => setIsOpen(true)}>
                      {challengeData ? challengeData.title : '챌린지선택'}
                    </div>
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
                {blob || number < length ? (
                  <span onClick={handleRetry}>
                    <BsArrowCounterclockwise size={40}></BsArrowCounterclockwise>
                  </span>
                ) : (
                  ''
                )}
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
                {blob || number < length ? (
                  <span onClick={handleStop}>
                    <BsCheck2 size={40}></BsCheck2>
                  </span>
                ) : (
                  ''
                )}
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
      {/* <video playsInline autoPlay muted ref={refVideo} style={{ width: '100%', height: '100%' }} /> */}
      <video playsInline autoPlay muted ref={refVideo} style={{ width: '100%', height: '100%' }} />
      <SelectPage isOpen={isOpen} setIsOpen={setIsOpen}></SelectPage>
    </div>
  );
}

export default PlusPage;
