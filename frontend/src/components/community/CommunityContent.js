import React from "react";

function CommunityContent(props) {
  return (
    <div className={props.styles.midWrapper}>
      <div>
        여러분 안뇽안뇽 나연입니다! 제 신곡 팝팝의 기부 챌린지 연탄 팝팝! 함께해 주실 거죠??
      </div>
      <div>
        <img
          alt='star'
          className={props.styles.communityImg}
          src='https://cdn.pixabay.com/photo/2022/05/06/17/15/cartoon-giraffe-7178753_960_720.jpg'
        ></img>
      </div>
    </div>
  );
}

export default CommunityContent;
