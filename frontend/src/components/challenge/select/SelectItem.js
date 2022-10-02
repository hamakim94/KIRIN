import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileImg from '../../common/ProfileImg';

function SelectItem(props) {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(false);
  const handleClick = () => {
    if (props.audioRef.current) {
      props.audioRef.current.pause();
    }
    if (props.checkRef.current === props.index) {
      if (playing) {
        props.audioRef.current.pause();
        setPlaying(false);
      } else {
        props.audioRef.current.volume = 0.2;
        props.audioRef.current.play();
        setPlaying(true);
      }
    } else {
      props.audioRef.current = new Audio(`/files/${props.item.music}`);
      props.audioRef.current.volume = 0.2;
      props.audioRef.current.play();
      setPlaying(true);
    }
    if (props.prevRef.current && props.checkRef.current !== props.index) {
      props.prevRef.current(false);
    }
    props.checkRef.current = props.index;
    props.prevRef.current = setPlaying;
  };
  return (
    <div id={props.styles.listWrapper}>
      <div className={props.styles.leftWrapper}>
        <ProfileImg src={props.item.profile} size={'50px'} />
      </div>
      <div className={props.styles.midWrapper}>
        <div className={props.styles.topText}>{props.item.title}</div>
        <div className={props.styles.botText}>
          {props.item.star} - {props.item.musicTitle}
        </div>
      </div>
      <div className={props.styles.rightWrapper}>
        <div
          onClick={handleClick}
          className={playing ? props.styles.pause : props.styles.play}
        ></div>
        <div onClick={() => navigate('/plus', { state: { id: props.item.challengeId } })}>
          보내기
        </div>
      </div>
    </div>
  );
}

export default SelectItem;
