import React, { useEffect, useState } from 'react';
import {
  RiZoomInFill,
  RiMessage3Line,
  RiHeart2Fill,
  RiHeart2Line,
  RiShareFill,
} from 'react-icons/ri';
import swal from 'sweetalert';
import Sheet from 'react-modal-sheet';
import SavanaComment from './SavanaComment';
import UseAxios from '../../utils/UseAxios';
import { useNavigate } from 'react-router-dom';
import ImgHeader from '../common/ImgHeader';

function ProgressBar(props) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const newValue = props.width * props.percent;
    setValue(newValue);
  }, [props.width, props.percent]);
  if (props.isProceeding) {
    return (
      <div className={props.styles.progressDiv} style={{ width: props.width }}>
        <div style={{ width: `${value}px` }} className={props.styles.progress} />
      </div>
    );
  } else {
    return (
      <div className={props.styles.progressDiv} style={{ width: props.width }}>
        <div style={{ width: `${value}px` }} className={props.styles.progressEnd} />
      </div>
    );
  }
}

function ChallengeCard(props) {
  // const [copied, setCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState(null);

  const navigate = useNavigate();
  const progressWidth = window.innerWidth * 0.9;
  // function copy() {
  //   const el = document.createElement('input');
  //   el.value = window.location.href;
  //   document.body.appendChild(el);
  //   el.select();
  //   document.execCommand('copy');
  //   document.body.removeChild(el);
  //   setCopied(true);
  //   swal('링크 복사가 완료되었습니다');
  // }

  useEffect(() => {
    if (props.item) {
      setData(props.item);
      console.log(props.item);
    }
  }, [props.item]);
  const likeButtonClick = () => {
    if (!data.liked) {
      setData((data) => ({
        ...data,
        liked: !data.liked,
        likeCnt: data.likeCnt + 1,
      }));
      UseAxios.post(`/challenges/like?challengeId=${data.challengeId}`, {
        params: {
          challengeId: data.challengeId,
        },
      });
    } else if (data.liked) {
      UseAxios.delete(`/challenges/like?challengeId=${data.challengeId}`, {
        params: {
          challengeId: data.challengeId,
        },
      });
      setData((data) => ({
        ...data,
        liked: !data.liked,
        likeCnt: data.likeCnt - 1,
      }));
    }
  };

  const onLoaded = () => {
    if (props.setLoading) {
      props.setLoading(true);
    }
  };

  return data ? (
    <div className={props.styles.cardWrapper}>
      <div className={props.styles.coverBox}>
        <ImgHeader></ImgHeader>
        <div className={props.styles.blankBox}></div>
        <div className={props.styles.iconBox}>
          <a
            onClick={() =>
              navigate(`/challenge/${data.challengeId}`, {
                state: {
                  data,
                },
              })
            }
          >
            <RiZoomInFill className={props.styles.clickIcon}></RiZoomInFill>
          </a>
          <div>
            <a onClick={likeButtonClick}>
              {!data.liked ? (
                <RiHeart2Line className={props.styles.clickIcon}></RiHeart2Line>
              ) : (
                <RiHeart2Fill className={props.styles.likeIcon}></RiHeart2Fill>
              )}
            </a>
            <div className={props.styles.iconCount}>{data.likeCnt}</div>
          </div>
          <div>
            <RiMessage3Line
              className={props.styles.clickIcon}
              onClick={() => setIsOpen(true)}
            ></RiMessage3Line>
            <Sheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
              <Sheet.Container style={{ height: '50%', zIndex: 4, position: 'absolute' }}>
                <Sheet.Header />
                <Sheet.Content style={{ margin: '20px' }} disableDrag={true}>
                  <SavanaComment challengeId={data ? data.challengeId : ''}></SavanaComment>
                </Sheet.Content>
              </Sheet.Container>
              <Sheet.Backdrop style={{ zIndex: 3 }} onTap={() => setIsOpen(false)} />
            </Sheet>
            <div className={props.styles.iconCount}>{data.commentCount}</div>
          </div>
          <a>
            {/* <RiShareFill className={props.styles.clickIcon} onClick={copy}></RiShareFill> */}
          </a>
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
        playing={hover}
        controls={false}
        volume={0.1}
        playsinline
        ref={(el) => (props.check ? (props.check.current[props.index] = el) : '')}
      /> */}
      <video
        src={`/files/${data.video}`}
        ref={(el) => (props.check ? (props.check.current[props.index] = el) : '')}
        playsInline
        muted
        controls
        style={{ width: '100%', height: '100%' }}
        onCanPlayThrough={props.index === 0 ? onLoaded : () => {}}
        onEnded={() => props.check.current[props.index].play()}
      />
    </div>
  ) : (
    ''
  );
}

export default ChallengeCard;
