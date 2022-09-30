import React from 'react';

function ChallengeStarProfile(props) {
  return (
    <div>
      <div className={props.styles.profileBox}>
        <div className={props.styles.imgName}>
          <img className={props.styles.starImg} src={`/files/${props.data.user.profileImg}`}></img>

          <div className={props.styles.starName}>{props.data.user.nickname}</div>
        </div>

        <div className={props.styles.starInfo}> 스타 글</div>
      </div>
    </div>
  );
}

export default ChallengeStarProfile;
