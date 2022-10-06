import React, { useEffect, useRef, useState } from 'react';
import { FaRegHeart, FaHeart, FaRegCommentAlt, FaInfoCircle } from 'react-icons/fa';
import Sheet from 'react-modal-sheet';
import SavanaComment from './SavanaComment';
import UseAxios from '../../utils/UseAxios';
import { useNavigate } from 'react-router-dom';
import ProfileImg from '../common/ProfileImg';
import ImgHeader from '../common/ImgHeader';

function ProgressBar(props) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const newValue = props.width * props.percent;
    setValue(newValue);
  }, [props.width, props.percent]);
  if (props.isProceeding) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={props.styles.progressDiv} style={{ width: props.width }}>
          <div style={{ width: `${value}px` }} className={props.styles.progress} />
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={props.styles.progressDiv} style={{ width: props.width }}>
          <div style={{ width: `${value}px` }} className={props.styles.progressEnd} />
        </div>
      </div>
    );
  }
}

function ChallengeCard(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);
  const [id, setId] = useState(null);
  const videoRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate();
  const progressWidth = window.innerWidth * 0.9;

  useEffect(() => {
    if (props.item) {
      setData(props.item);
      UseAxios.get(`/challenges/savana/challenge/${props.item.challengeId}`).then((res) =>
        setId(res.data.user.id)
      );
    }
  }, [props.item]);

  const likeButtonClick = () => {
    if (!data.liked) {
      setData((data) => ({
        ...data,
        liked: !data.liked,
        likeCnt: data.likeCnt + 1,
      }));
      UseAxios.post(`/challenges/like?challengeId=${data.id}`, {
        params: {
          challengeId: data.id,
        },
      });
    } else if (data.liked) {
      UseAxios.delete(`/challenges/like?challengeId=${data.id}`, {
        params: {
          challengeId: data.id,
        },
      });
      setData((data) => ({
        ...data,
        liked: !data.liked,
        likeCnt: data.likeCnt - 1,
      }));
    }
  };
  useEffect(() => {
    if (videoRef.current) {
      const scroll = videoRef.current.getBoundingClientRect().y;
      if (scroll === 0) {
        if (videoRef.current.paused) {
          videoRef.current.muted = false;
          videoRef.current.volume = 0.1;
          videoRef.current.play();
        }
      }
    }
  }, [videoRef.current, props.loading]);

  useEffect(() => {
    if (!props.conRef.current) return;
    props.conRef.current.addEventListener('scroll', yScrollEvent);
    return () => {
      if (props.conRef.current) {
        props.conRef.current.removeEventListener('scroll', yScrollEvent);
      }
    };
  }, [props.conRef.current]);

  const yScrollEvent = () => {
    const scroll = videoRef.current.getBoundingClientRect().y;
    if (scroll > -100 && scroll < 100) {
      if (videoRef.current.paused) {
        videoRef.current.volume = 0.1;
        videoRef.current.play();
        btnRef.current.click();
      }
    } else {
      if (!videoRef.current.paused) {
        videoRef.current.currentTime = 0;
        videoRef.current.pause();
      }
    }
  };
  const videoUnmute = () => {
    if (!videoRef.current.paused) {
      videoRef.current.muted = false;
    }
  };

  const onLoaded = () => {
    if (props.setLoading) {
      props.setLoading(true);
    }
  };

  return data ? (
    <div className={props.styles.cardWrapper} ref={btnRef} onClick={videoUnmute}>
      <div className={props.styles.coverBox}>
        <ImgHeader></ImgHeader>
        <div className={props.styles.blankBox}></div>
        <div className={props.styles.iconBox}>
          <div style={{ textAlign: 'center', marginBottom: 15 }}>
            {data.user.id === id ? (
              <ProfileImg
                size={'35px'}
                src={data.user.profileImg}
                onClick={() => navigate(`/star/${data.user.id}`)}
              />
            ) : (
              ''
            )}
          </div>
          <div style={{ textAlign: 'center', marginBottom: 15 }}>
            <a
              onClick={() =>
                navigate(`/challenge/${data.challengeId}`, {
                  state: {
                    data,
                  },
                })
              }
            >
              <FaInfoCircle className={props.styles.clickIcon}></FaInfoCircle>
            </a>
          </div>
          <div style={{ textAlign: 'center' }}>
            <a onClick={likeButtonClick}>
              {!data.liked ? (
                <FaRegHeart className={props.styles.clickIcon}></FaRegHeart>
              ) : (
                <FaHeart className={props.styles.likeIcon}></FaHeart>
              )}
            </a>
            <div className={props.styles.iconCount}>{data.likeCnt}</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <FaRegCommentAlt
              className={props.styles.clickIcon}
              onClick={() => setIsOpen(true)}
            ></FaRegCommentAlt>
            <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <Sheet.Container style={{ height: '50%', zIndex: 4, position: 'absolute' }}>
                <Sheet.Header />
                <Sheet.Content disableDrag={true}>
                  <SavanaComment challengeId={data ? data.challengeId : ''}></SavanaComment>
                </Sheet.Content>
              </Sheet.Container>
              <Sheet.Backdrop style={{ zIndex: 3 }} onTap={() => setIsOpen(false)} />
            </Sheet>
            <div className={props.styles.iconCount}>{data.commentCnt}</div>
          </div>
        </div>
        <div className={props.styles.infoBox}>
          <div className={props.styles.infoTop}>
            <div className={props.styles.infoTitle}>{data.title}</div>
          </div>
          <ProgressBar
            styles={props.styles}
            width={progressWidth}
            percent={data.currentNum / data.targetNum}
            isProceeding={props.item.isProceeding}
          ></ProgressBar>
          <div className={props.styles.infoBot}>
            <span className={props.styles.infoText}>{data.currentNum}명</span>
            <span className={props.styles.infoText}>
              {((data.currentNum / data.targetNum) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
      {/* <ReactPlayer
        className={props.styles.reactPlayer}
        url={`/files/${data.video}`}
        width='100%'
        height='100%'
        controls={false}
        volume={0.1}
        playsinline
        ref={(el) => (props.check ? (props.check.current[props.index] = el) : '')}
      /> */}
      <video
        src={`/files/${data.video}`}
        // ref={(el) => (props.check ? (props.check.current[props.index] = el) : '')}
        playsInline
        muted
        style={{ width: '100%', height: '100%' }}
        onCanPlayThrough={props.index === 0 ? onLoaded : () => {}}
        onEnded={() => videoRef.current.play()}
        ref={videoRef}
      />
      {/* {props.isIOS
        ?  <audio
             src={`/files/${music}`}
             ref={(el) => (props.audio ? (props.audio.current[props.index] = el) : '')}
              onCanPlayThrough={props.index === 0 ? onLoaded : () => {}}
           ></audio>
          
        : ''} */}
    </div>
  ) : (
    ''
  );
}

export default ChallengeCard;
