import React, { useMemo, useContext, useRef, useState, useEffect } from 'react';
import Context from '../utils/Context';
import Header from '../components/common/Header';
import styles from './RegisterPage.module.css';
import getBlobDuration from 'get-blob-duration';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material/';
import UseAxios from '../utils/UseAxios';
import swal2 from 'sweetalert2';
import WalletModal from '../components/wallet/WalletModal';
import ABI from '../TokenABI.json';
import CA from '../TokenCA.json';
import { toast } from 'react-toastify';

function RegisterPage() {
  const videoRef = useRef(null);
  const checkRef = useRef(null);
  const audioRef = useRef(null);
  const [number, setNumber] = useState(0.0);
  const [waitButton, setWaitButton] = useState(false);
  const [length, setLength] = useState(null);
  const [tip, setTip] = useState('비디오를 누를 시 영상이 재생됩니다.');
  const [amount, setAmount] = useState(0);
  const { blob, setBlob } = useContext(Context);
  const [check, setCheck] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(''); // 토큰 잔액
  const { userData } = useContext(Context);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    if (userData) {
      var Web3 = require('web3');
      var web3 = new Web3(new Web3.providers.HttpProvider(`${process.env.REACT_APP_BASEURL}/bc/`));
      var contract = new web3.eth.Contract(ABI, CA); // ABI, CA를 통해 contract 객체를 만들어서 보관한다. 나중에 활용함
      contract.methods // ABI, CA를 이용해 함수 접근
        .balanceOf(userData.walletAddress)
        .call()
        .then((balance) => {
          setData(balance);
        });
    }
  }, []);

  const handleClick = () => {
    if (videoRef.current) {
      if (checkRef.current) {
        videoRef.current.pause();
        checkRef.current = false;
        setTip('비디오를 누를 시 영상이 재생됩니다.');
        audioRef.current.pause();
        setWaitButton(false);
      } else {
        audioRef.current.volume = 0.1;
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
        playsInline
        muted
        ref={videoRef}
        src={blob ? URL.createObjectURL(blob) : ''}
        style={{ height: 400, objectFit: 'contain' }}
        onClick={handleClick}
      ></video>
    );
  });
  const MemoizedItem = useMemo(() => videoItem, [blob]);
  const onChangeVideo = (e) => {
    if (e.target.files[0]) {
      setVideo(e.target.files[0]);
    } else {
      setVideo(null);
      return;
    }
  };
  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
  }, [videoRef]);

  useEffect(() => {
    if (blob) {
      getBlobDuration(blob).then(function (duration) {
        setLength(duration);
      });
    }
  }, [blob]);
  const handleSubmit = (e) => {
    setCheck(true);
    e.preventDefault();
    let body = {
      challengeId: location.state.id,
      title: location.state.title,
      amount: amount,
    };
    if (amount !== 0) {
      if (amount > parseInt(data)) {
        swal2.fire({
          title: '보유 토큰이 부족합니다. 충전 후 다시 시도해주세요.',
          confirmButtonColor: '#ffc947',
          confirmButtonText: '확인',
        });
        setCheck(false);
      } else {
        function uuidv4() {
          return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (Math.random() * 16) | 0,
              v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
          });
        }
        let filename = uuidv4() + '.webm';
        const file = new File([blob], filename);
        const data = new FormData();
        if (video) {
          data.append('video', video);
        } else {
          data.append('video', file);
        }
        const json = JSON.stringify(body);
        const fixData = new Blob([json], { type: 'application/json' });
        data.append('challengeRequestDTO', fixData);
        UseAxios.post(`/challenges`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
          .then((res) => {
            setBlob(null);
            (() => {
              toast('업로드 요청이 완료되었습니다.', {
                position: 'top-center',
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                containerId: 'A',
              });
            })();
            navigate('/');
          })
          .catch((err) => {
            setCheck(false);
          });
      }
    } else {
      function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      }
      let filename = uuidv4() + '.webm';
      const file = new File([blob], filename);
      const data = new FormData();
      if (video) {
        data.append('video', video);
      } else {
        data.append('video', file);
      }
      const json = JSON.stringify(body);
      const fixData = new Blob([json], { type: 'application/json' });
      data.append('challengeRequestDTO', fixData);
      UseAxios.post(`/challenges`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((res) => {
          setBlob(null);
          (() => {
            toast('업로드 요청이 완료되었습니다.', {
              position: 'top-center',
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              containerId: 'A',
            });
          })();
          navigate('/');
        })
        .catch((err) => {
          setCheck(false);
        });
      {
      }
    }
  };

  return (
    <div className='wrapper'>
      <Header title={'챌린지 등록'} video={true}></Header>
      <label htmlFor='ex_video' style={{ color: '#FFFFFF' }}>
        동영상업로드
      </label>
      <input
        type='file'
        accept='video/*'
        id='ex_video'
        onChange={onChangeVideo}
        style={{ display: 'none' }}
      />
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
          <audio ref={audioRef} src={location ? `/files/${location.state.music}` : ''}></audio>
          <span style={{ textAlign: 'center', fontSize: 12 }}>{tip}</span>
        </div>
      ) : (
        ''
      )}
      <div style={{ marginLeft: 10 }}>참여 챌린지 제목</div>
      <div>
        <input
          className={styles.inputBox}
          type='text'
          disabled
          value={location ? `${location.state.title}` : ''}
        ></input>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginLeft: 10 }}>기부 금액(선택)</div>
        <div>
          <input
            id={styles.tokenBox}
            type='number'
            value={amount || ''}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          ></input>
          KRT
        </div>
        <div style={{ marginLeft: 10 }}>보유 토큰</div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 15,
            marginLeft: 10,
          }}
        >
          <div>{data} KRT</div>
          <div style={{ marginRight: 10 }}>
            <WalletModal buttonTitle={'충전하기'} styles={styles} setData={setData}></WalletModal>
          </div>
        </div>
        <div>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            size='medium'
            className={styles.Btn}
            // disabled={check}
            style={{
              width: window.innerWidth - 20,
              height: 30,
              backgroundColor: '#ffd046',
              color: '#000000',
              marginLeft: 10,
              marginRight: 10,
            }}
          >
            업로드
          </Button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
