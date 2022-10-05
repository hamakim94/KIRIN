import React, { useEffect, useState } from 'react';
import styles from './ChallengeCard.module.css';
import { useNavigate } from 'react-router-dom';

function ProgressBar(props) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const newValue = props.width * props.percent;
    setValue(newValue);
  }, [props.width, props.percent]);
  if (props.isProceeding) {
    return (
      <div className={styles.progressDiv} style={{ width: props.width }}>
        <div style={{ width: `${value}px` }} className={styles.progress} />
      </div>
    );
  } else {
    return (
      <div className={styles.progressEnd} style={{ width: props.width }}>
        {/* <div style={{ width: `${value}px` }} className={styles.progressEnd} /> */}
      </div>
    );
  }
}

function ChallengeCard(props) {
  // const [hover, setHover] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className={styles.cardWrapper}
      // onMouseOver={() => setHover(true)}
      // onMouseOut={() => setHover(false)}
      onClick={() =>
        props.category !== 4
          ? navigate(`/savana/${props.category}`, {
              state: {
                id: props.item.id,
                challengeId: props.item.challengeId,
              },
            })
          : navigate(`/challenge/${props.item.challengeId}`, {
              state: {
                data: props.item,
              },
            })
      }
    >
      <div className={styles.coverBox}>
        <div className={styles.blankBox}></div>
        <div className={styles.infoBox}>
          <div className={styles.infoTop}>
            <div className={styles.infoTitle}>{props.item.title}</div>
            <div className={styles.infoText}>{props.item.donationOrganizationName}</div>
            {(() => {
              if (props.item.isProceeding) {
                return (
                  <div className={styles.infoText}>
                    D-{Math.ceil((new Date(props.item.endDate) - new Date()) / 86400000)}
                  </div>
                );
              } else {
                return <div className={styles.infoText}>{'종료'}</div>;
              }
            })()}
          </div>
          <ProgressBar
            styles={props.styles}
            isProceeding={props.item.isProceeding}
            width={134}
            percent={Math.floor((props.item.currentNum / props.item.targetNum) * 100) / 100}
          ></ProgressBar>
          <div className={styles.infoBot}>
            <span className={styles.infoText}>{props.item.currentNum}명</span>
            <span className={styles.infoText}>
              {((props.item.currentNum / props.item.targetNum) * 100).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
      <img
        src={`/files/${props.item.thumbnail}`}
        width={144}
        height={256}
        style={{ objectFit: 'contain' }}
      ></img>
      {/* <ReactPlayer
        className={props.styles.reactPlayer}
      <ReactPlayer
        className={styles.reactPlayer}
        height={256}
        width={144}
        url={`/files/${props.item.video}`}
        fallback={<div>로딩</div>}
        playing={hover}
        controls={false}
        playsinline
        volume={0}
      /> */}
    </div>
  );
}

export default ChallengeCard;
