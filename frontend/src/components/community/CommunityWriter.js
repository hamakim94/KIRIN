import React from 'react';
import TimeForToday from '../common/TimeForToday';

function CommunityWriter(props) {
  const newDate = new Date(props.data.reg);
  return (
    <div className={props.styles.writerWrapper}>
      <div>
        <img
          alt='star'
          className={props.styles.starImg}
          src={`/files/${props.data.user.profileImg}`}
        ></img>
      </div>
      <div className={props.styles.nameWrapper}>
        <b>{props.data.user.nickname}</b>
        <span className={props.styles.writeDate}>{TimeForToday(newDate)}</span>
      </div>
    </div>
  );
}

export default CommunityWriter;
