import React from 'react';
import TimeForToday from '../common/TimeForToday';
import ProfileImg from '../common/ProfileImg';

function CommunityWriter(props) {
  const newDate = new Date(props.data.reg);
  return (
    <div className={props.styles.writerWrapper}>
      <div style={{ marginRight: 10 }}>
        <ProfileImg src={props.data.user.profileImg} size={'45px'} />
      </div>
      <div className={props.styles.nameWrapper}>
        <b>{props.data.user.nickname}</b>
        <span className={props.styles.writeDate}>{TimeForToday(newDate)}</span>
      </div>
    </div>
  );
}

export default CommunityWriter;
