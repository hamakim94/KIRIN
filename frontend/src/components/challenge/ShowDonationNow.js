import React from 'react';

function ShowDonationNow(props) {
  return (
    <div className={props.styles.nowTop}>
      <div className={props.styles.nowList}>
        <div className={props.styles.medalBox}>
          <img
            className={props.styles.nowImg}
            src="https://mblogthumb-phinf.pstatic.net/20120604_42/shwbsmbe_13388133572436P5qK_JPEG/naver_com_20120604_161317.jpg?type=w2"
          ></img>

          <div className={props.styles.nameTocken}>
            <div>임나연 채고</div>
            <div>5000토큰</div>
          </div>
        </div>
        <div className={props.styles.number}>1위</div>
      </div>
    </div>
  );
}

export default ShowDonationNow;
