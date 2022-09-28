import React, { useState } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

function SelectItem(props) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (props.audioRef.current) {
      props.audioRef.current.pause();
    }
    props.audioRef.current = new Audio(props.item.music);
    props.audioRef.current.play();
    flushSync(() => {
      props.setCheckIdx(props.index);
    });
  };
  return (
    <div id={props.styles.listWrapper} onClick={handleClick}>
      <div className={props.styles.leftWrapper}>
        <img className={props.styles.coverImg} src={props.item.profileImg}></img>
      </div>
      <div className={props.styles.midWrapper}>
        <div className={props.styles.topText}>{props.item.title}</div>
        <div className={props.styles.botText}>
          {props.item.star} - {props.item.musicTitle}
        </div>
      </div>
      <div className={props.styles.rightWrapper}>
        <div
          className={props.checkIdx == props.index ? props.styles.pause : props.styles.play}
        ></div>
        <div></div>
      </div>
    </div>
  );
}

export default SelectItem;
