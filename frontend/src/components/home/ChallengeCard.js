import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

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
            <span className={props.styles.infoText}>{props.item.title}</span>
            <span className={props.styles.infoText}>D-21</span>
          </div>
          <ProgressBar styles={props.styles} width={134} percent={0.7}></ProgressBar>
          <div className={props.styles.infoBot}>
            <span className={props.styles.infoText}>251명</span>
            <span className={props.styles.infoText}>70%</span>
          </div>
        </div>
      </div>
      <ReactPlayer
        className={props.styles.reactPlayer}
        config={{
          youtube: {
            playerVars: { modestbranding: 1, mute: 1 },
          },
        }}
        url={`${props.item.video}`}
        width='100%'
        height='100%'
        playing={hover}
        controls={false}
        volume={0}
      />
    </div>
  );
}

export default ChallengeCard;
