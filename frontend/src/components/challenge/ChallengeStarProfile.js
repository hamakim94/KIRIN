import React from 'react';

function ChallengeStarProfile(props) {
  return (
    <div>
      <div className={props.styles.profileBox}>
        <div className={props.styles.imgName}>
          <img
            className={props.styles.starImg}
            src="https://mblogthumb-phinf.pstatic.net/20120604_42/shwbsmbe_13388133572436P5qK_JPEG/naver_com_20120604_161317.jpg?type=w2"
          ></img>

          <div className={props.styles.starName}>스타 이름</div>
        </div>

        <div className={props.styles.starInfo}> 스타 글</div>
      </div>
    </div>
  );
}

export default ChallengeStarProfile;
