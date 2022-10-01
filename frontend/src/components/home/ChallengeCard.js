import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/lazy';

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
  const [hover, setHover] = useState(false);
  return (
    <div
      className={props.styles.cardWrapper}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <div className={props.styles.coverBox}>
        <div className={props.styles.blankBox}></div>
        <div className={props.styles.infoBox}>
          <div className={props.styles.infoTop}>
            <div className={props.styles.infoTitle}>{props.item.title}</div>
            <div className={props.styles.infoText}>{props.item.donationOrganizationName}</div>
            {(() => {
              if (props.item.isProceeding) {
                return (
                  <div className={props.styles.infoText}>
                    D-{Math.ceil((new Date(props.item.endDate) - new Date()) / 86400000)}
                  </div>
                );
              } else {
                return <div className={props.styles.infoText}>{'끝'}</div>;
              }
            })()}
          </div>
          <ProgressBar
            styles={props.styles}
            isProceeding={props.item.isProceeding}
            width={134}
            percent={Math.floor((props.item.currentNum / props.item.targetNum) * 100) / 100}
          ></ProgressBar>
          <div className={props.styles.infoBot2}>
            <span className={props.styles.infoText}>{props.item.currentNum}명</span>
            <span className={props.styles.infoText}>
              {Math.floor((props.item.currentNum / props.item.targetNum) * 100)}%
            </span>
          </div>
        </div>
      </div>
      <ReactPlayer
        className={props.styles.reactPlayer}
        height={256}
        width={144}
        url={`/files/${props.item.video}`}
        fallback={<div>로딩</div>}
        playing={hover}
        controls={false}
        playsinline
        volume={0}
      />
    </div>
  );
}

export default ChallengeCard;
